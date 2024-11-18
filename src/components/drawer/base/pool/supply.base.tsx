import { 
  useEffect,
  ChangeEvent, 
  useMemo, 
  useState 
} from "react"
import Button from "@/components/button"
import Paragraph from "@/components/paragraph"
import Table from "@/components/table"
import { Input } from "@/components/input"
import { AmountIcon } from "@/assets/icons/amount"
import { Typography } from "@/components/typography"
import { twMerge } from "tailwind-merge"
import { 
  useAccount,
  useOfflineSigners, 
} from 'graz'
import { IBaseLockTransaction } from "@/types/api/pool"
import { getAssetDecimalObj, pureNumberFormat } from "@/utils"
import Dropdown from "@/components/dropdown"
import { GET_ASSET_LOCK_TRANSACTION, GET_MAX_INTEREST_RATE, GET_POOL_LOCK_BALANCE } from "@/constants/query"
import { queryClient } from "@/wagmi"
import { useToast } from "@/hooks/useToast"
import { ERROR_MESSAGE, FAILED_WALLET_CONNECTION, SUCCESS_OPERATION, WALLET_INSTALL, WARNING_MESSAGE } from "@/constants/message"
import { TxClient } from "@/cf-client/client"
import { MsgRequestSupply } from "@/cf-client/cfprotocol.lock/tx"
import { TailSpin } from "react-loader-spinner"
import { useAssetLockTransaction } from "@/hooks/queries/useAssetLockTransaction"
import { useMaxInterestRate } from "@/hooks/queries/useMaxInterestRate"
import { useAssetProfile } from "@/hooks/queries/useAssetProfile"
import { POOL_AVAILABLE } from "@/constants"

export const SupplyContainer = () => {
  const { messageApi } = useToast()
  const { data: account } = useAccount()
  const { data: offlineSigners } = useOfflineSigners()
  const { data: assetLockTransaction } = useAssetLockTransaction()
  const { data: maxRate } = useMaxInterestRate()
  const { data: assetProfiles } = useAssetProfile()

  const [ selected, setSelected ] = useState<IBaseLockTransaction | undefined>(undefined)
  const [ rate, setRate ] = useState<number | undefined>(0)
  const [ loading, setLoading ] = useState<boolean>(false)

  /**
   * Get decimals for the selected asset's amount
   */
  const getDecimalObj = (asset_id?: string) => {
    if (
      !asset_id ||
      !assetLockTransaction || 
      !assetLockTransaction.asset_lock_transaction || 
      assetLockTransaction.asset_lock_transaction.length < 1
    )
      return {
        decimals: 0,
        symbol: ``
      }

    return getAssetDecimalObj(assetProfiles, asset_id)
  }
  
  /**
   * Get dropdown array to supply from asset_lock_transaction array.
   */
  const dropdownArr = useMemo(() => {
    if (
      !account?.bech32Address || 
      !assetLockTransaction || 
      !assetLockTransaction.asset_lock_transaction || 
      assetLockTransaction.asset_lock_transaction.length < 1
    )
      return []

    const _filteredData = assetLockTransaction.asset_lock_transaction
      .filter((e: IBaseLockTransaction) => 
        e.creator === account.bech32Address && 
        e.status === 'Completed' &&
        e.pull_status === POOL_AVAILABLE
      )   
    return _filteredData
  }, [assetLockTransaction, account?.bech32Address])

  /**
   * Handle supply
   */
  const handleSupply = async () => {

    if (!window.keplr) {
      return messageApi.Alert(WALLET_INSTALL("Kelpr"));
    }
    if (!account?.bech32Address || !offlineSigners?.offlineSigner) {
      return messageApi.Alert(FAILED_WALLET_CONNECTION(`Kelpr`));
    }
    if (!selected)
      return messageApi.Alert({ ...WARNING_MESSAGE, content: 'Select a lock item to be supplied.'})
    if (rate && rate > (Number(maxRate?.max_interest_rate ?? 0) * 100))
      return

    try {
      setLoading(true)

      const _supplyData: MsgRequestSupply = {
        creator: account.bech32Address,
        lockId: Number(selected.asset_id),
        interestRate: ((rate || 0) / 100).toString(),
        reserved: "",
      }

      const client = await TxClient(offlineSigners?.offlineSigner);
      let msg = await client.msgRequestSupply(_supplyData);
      await client.signAndBroadcast([msg]);
      await invalidateQuery()

      setLoading(false)
      
      messageApi.Alert(SUCCESS_OPERATION('Successfully supplied.'))

    } catch (error) {
      setLoading(false)
      messageApi.Alert(ERROR_MESSAGE(error as string))
    }
  }

  /**
   * Invalidate queries
   */ 
  const invalidateQuery = async () => {
    Promise.all([
      queryClient.invalidateQueries({ queryKey: [GET_POOL_LOCK_BALANCE] }),
      queryClient.invalidateQueries({ queryKey: [GET_ASSET_LOCK_TRANSACTION] }),
      queryClient.invalidateQueries({ queryKey: [GET_MAX_INTEREST_RATE] }),
    ])
  }

  useEffect(() => {
    invalidateQuery()
  }, [])

  return (
    <div className="w-full mt-[30px]">
      {/* Search */}
      <Typography variant="label-medium" className="text-[13px] font-medium">Amount</Typography>

      <div className="flex flex-col gap-[10px] mt-8">
        <Typography variant="label-small" className="f-light">
          Select Locked Amount
        </Typography>
        <Dropdown.LockTransaction
          list={dropdownArr}
          value={selected}
          onChange={setSelected}
          className="rounded-lg"
        />
      </div>

      <Input 
        label="Interest Rate ( % )"
        value={rate ?? ''}
        placeholder="0"
        icon={<AmountIcon />}
        innerButtonLabel="Max"
        errorMsg={
          rate && rate > (Number(maxRate?.max_interest_rate ?? 0) * 100) 
            ? `Interest rate should be less than ${Number((Number(maxRate?.max_interest_rate ?? 0) * 100).toFixed(0))} %`
            : null
        }
        onMax={() => setRate(Number((Number(maxRate?.max_interest_rate ?? 0) * 100).toFixed(0)))}
        onChange={(e: ChangeEvent<HTMLInputElement>) => 
          setRate(Number(e.target.value || 0))
        }
        classOverride={{
          container: 'mt-6',
          inputContainer: 'bg-black mt-3',
          input: 'bg-black ml-1',
          value: 'text-[13px] text-[#5e7e8e]',
          icon: 'w-8'
        }}
      />

      <Paragraph.List
        label="Suppliable amount"
        value={`
          ${pureNumberFormat(Number(selected?.amount) / getDecimalObj(selected?.asset_id).decimals, 2)} 
          ${getDecimalObj(selected?.asset_id).symbol}
        `} 
        classOverride={{
          container: 'flex-1 pt-4 pb-5 border-b border-[#36f5cf]/10',
        }}
      />

      {/* Button group */}
      <div className="flex flex-col gap-6">
        {loading ? (
          <div className="flex flex-1 justify-center items-center bg-[#0aab8b] rounded-lg py-[17px]">
            <TailSpin
              visible={true}
              height="20"
              width="20"
              color="#fff"
              ariaLabel="tail-spin-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : !selected || Number(selected.amount) <= 0 ? (
        <>
          <div className="flex flex-col gap-2.5 mt-8 ">
            <Button.Basic 
              label="Enter valid amount"
              className={twMerge(
                "w-full bg-[#36f5cf]/10",
                // 'hover:bg-[#0aab8b]'
              )}
              onClick={() => {}}
            />
          </div>
        </>
      ) : (
        <Button.Basic 
          label="Supply"
          className={twMerge(
            "w-full bg-[#36f5cf]/10",
            // inscribed && 'bg-[#0aab8b]',
          )}
          onClick={handleSupply}
        />
      )}
      </div>

      {/* Locked Table */}
      <Table.SupplyTransaction />
      
    </div>
  )
}