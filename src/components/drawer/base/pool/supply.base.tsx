import { 
  useEffect,
  ChangeEvent, 
  useMemo, 
  useState 
} from "react"
import Button from "@/components/button"
import Paragraph from "@/components/paragraph"
import { Input } from "@/components/input"
// import { CustomProgress } from "@/components/progress"
import { AmountIcon } from "@/assets/icons/amount"
import { Typography } from "@/components/typography"
import { twMerge } from "tailwind-merge"
// import { Avatar } from "@/components/avatar"
// import { ArrowRightIcon } from "@/assets/icons/arrow"
import { 
  useAccount,
  useOfflineSigners, 
  // useBalance 
} from 'graz'
// import { cosmoshub } from '@/config/graz'
import { IBaseLockTransaction } from "@/types/api/pool"
import { pureNumberFormat } from "@/utils"
import { useLockBalance } from "@/hooks/queries/useLockBalance"
import Dropdown from "@/components/dropdown"
import { IBaseBalance, IBaseLockBalance } from "@/types/api/other"
import { GET_ASSET_LOCK_TRANSACTION, GET_MAX_INTEREST_RATE, GET_POOL_LOCK_BALANCE } from "@/constants/query"
import { queryClient } from "@/wagmi"
import { useToast } from "@/hooks/useToast"
import { FAILED_WALLET_CONNECTION, WALLET_INSTALL, WARNING_MESSAGE } from "@/constants/message"
import { TxClient } from "@/cf-client/client"
import { MsgRequestSupply } from "@/cf-client/cfprotocol.lock/tx"
import { TailSpin } from "react-loader-spinner"
import { useAssetLockTransaction } from "@/hooks/queries/useAssetLockTransaction"
import { useMaxInterestRate } from "@/hooks/queries/useMaxInterestRate"

// export interface ISupplyContainer {
//   data: IPool
// }

export const SupplyContainer = () => {
  const { messageApi } = useToast()
  const { data: account } = useAccount()
  const { data: offlineSigners } = useOfflineSigners()
  const { data: assetLockTransaction } = useAssetLockTransaction()
  const { data: lockData } = useLockBalance()
  const { data: maxRate } = useMaxInterestRate()
  // const { data: balance } = useBalance({
  //   chainId: cosmoshub.chainId,
  //   denom: cosmoshub.stakeCurrency.coinMinimalDenom,
  //   bech32Address: account?.bech32Address,
  // });
  const [selected, setSelected] = useState<IBaseLockTransaction | undefined>(undefined)
  const [ rate, setRate ] = useState<number | undefined>(0)
  const [ activeLock, setActiveLock ] = useState<IBaseLockBalance | undefined>(undefined)
  const [ loading, setLoading ] = useState<boolean>(false)

  // get get suppliable amount and interest apy, filter lock-balance data by user account
  // and get balances array.
  const filterUserLockBalances = useMemo(() => {
    if (
      !account?.bech32Address || 
      !lockData || 
      !lockData.lock_balance || 
      lockData.lock_balance.length < 1
    )
      return []
    const _filteredData = lockData.lock_balance.find((e: IBaseLockBalance) => e.creator === account.bech32Address)
    setActiveLock(_filteredData)
    if (!_filteredData)
      return []
    const _balances = _filteredData.balances
    return _balances
  }, [lockData, account?.bech32Address])

  // get dropdown array to supply from asset_lock_transaction array.
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
        e.status === 'Completed'
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
      return messageApi.Alert(FAILED_WALLET_CONNECTION);
    }
    if (!activeLock || !selected)
      return messageApi.Alert({ ...WARNING_MESSAGE, content: 'Select a lock item to be supplied.'})
    if (rate && rate > (Number(maxRate?.max_interest_rate ?? 0) * 100))
      return

    try {
      setLoading(true)

      const _supplyData: MsgRequestSupply = {
        creator: activeLock.creator,
        lockId: Number(activeLock.id),
        interestRate: ((rate || 0) / 100).toString(),
        reserved: "",
      }

      const client = await TxClient(offlineSigners?.offlineSigner);
      let msg = await client.msgRequestSupply(_supplyData);
      const result = await client.signAndBroadcast([msg]);

      setLoading(false)
      await invalidateQuery()
      
      messageApi.Alert(
        {
          type: 'Success',
          title: 'Successfully supplied.',
          link: `https://explorer.ordibank.org/ordibank/tx/${result.transactionHash}`,
        },
        6,
      )

      console.log("Supply result ====>", result);
    } catch (error) {
      setLoading(false)
      console.log("Supply Error is ===>", error)
    }
  }

  // invalidate queries
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
        label="Interest Rate"
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
        // value={`${numberFormat(balance?.amount ?? 0)} ${props.data.asset_symbol}`}
        value={pureNumberFormat(filterUserLockBalances.reduce((res: number, curr: IBaseBalance) => res + Number(curr.balance) / 1e8, 0))}
        classOverride={{
          container: 'flex-1 pt-4 pb-5 border-b border-[#36f5cf]/10',
        }}
      />
      <Paragraph.List
        label="Total APY" 
        // value={`${numberFormat(props.data.apy)} %`}
        value={`${pureNumberFormat(filterUserLockBalances.reduce((res: number, curr: IBaseBalance) => res + Number(curr.interest_rate) * 100, 0))} %`}
        classOverride={{
          container: 'flex-1 pt-4 pb-5 border-b border-[#36f5cf]/10',
        }}
      />
      {/* <CustomProgress 
        headerLabels={['Current:', 'Max:']}
        headerValues={['$0', '$0']}
        current="0"
        limit="80"
        classOverride={{
          container: 'mt-4 mb-3',
          text: 'text-[13px]'
        }}
      /> */}
      {/* <Paragraph.List
        label="Supply balance (USDT)" 
        value={(
          <div className="flex items-center gap-1">
            {!amount || amount <= 0 ? (
              <Typography variant="label-medium" className="text-[13px] leading-[1.6rem] font-medium">$0</Typography>
            ) : (
              <>
                <Typography variant="label-medium" className="text-[13px] leading-[1.6rem] font-medium">$0</Typography>
                <Avatar icon={<ArrowRightIcon />} className="w-5"/>
                <Typography variant="label-medium" className="text-[13px] leading-[1.6rem] font-medium">{`$${amount}`}</Typography>
              </>
            )}
          </div>
        )}
        classOverride={{
          container: 'flex-1 py-[10px]',
        }}
      />
      <Paragraph.List
        label="Borrow limit" 
        value={numberFormat(Number(props.data.total_supply) * 0.8)}
        classOverride={{
          container: 'flex-1 py-[10px]',
        }}
      />
      <Paragraph.List
        label="Daily earnings" 
        value={(
          <div className="flex items-center gap-1">
            {!amount || amount <= 0 ? (
              <Typography variant="label-medium" className="text-[13px] leading-[1.6rem] font-medium">$0</Typography>
            ) : (
              <>
                <Typography variant="label-medium" className="text-[13px] leading-[1.6rem] font-medium">$0</Typography>
                <Avatar icon={<ArrowRightIcon />} className="w-5"/>
                <Typography variant="label-medium" className="text-[13px] leading-[1.6rem] font-medium">{`$${amount}`}</Typography>
              </>
            )}
          </div>
        )}
        classOverride={{
          container: 'flex-1 py-[10px]',
        }}
      /> */}

      {/* Button group */}
      <div className="flex flex-col gap-6">
        {loading ? (
          <div className="flex flex-1 justify-center items-center bg-[#0aab8b] rounded-lg py-[14px]">
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
      // {!amount || amount <= 0 || amount > Number(balance?.amount ?? 0) ? (
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
        // <>
        //   <div className="flex flex-col gap-2.5 mt-8">
        //     <Typography 
        //       variant="label-medium" 
        //       className={twMerge("text-[13px]", inscribed && 'text-[#5e7e8e]')}
        //     >
        //       Step1
        //     </Typography>
        //     <Button.Basic 
        //       label="Inscribe Tokens"
        //       className={twMerge(
        //         "w-full bg-[#0aab8b]",
        //         inscribed && 'bg-[#36f5cf]/10',
        //         // 'hover:bg-[#0aab8b]'
        //       )}
        //       onClick={() => setInscribed(true)}
        //     />
        //   </div>

        //   <div className="flex flex-col gap-2.5">
        //     <Typography 
        //       variant="label-medium" 
        //       className={twMerge("text-[13px]", !inscribed && 'text-[#5e7e8e]')}
        //     >
        //       Step2
        //     </Typography>
        //     <Button.Basic 
        //       label="Supply"
        //       className={twMerge(
        //         "w-full bg-[#36f5cf]/10",
        //         inscribed && 'bg-[#0aab8b]',
        //         // 'hover:bg-[#0aab8b]'
        //       )}
        //       onClick={() => setInscribed(false)}
        //     />
        //   </div>
        // </>
      )}
      </div>
    </div>
  )
}