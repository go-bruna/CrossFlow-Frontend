import { 
  useEffect,
  ChangeEvent, 
  useMemo, 
  useState 
} from "react"
import Button from "@/components/button"
import Paragraph from "@/components/paragraph"
// import Table from "@/components/table"
import Tab from "@/components/tab"
import Input from "@/components/input"
import { AmountIcon } from "@/assets/icons/amount"
import { Typography } from "@/components/typography"
import { twMerge } from "tailwind-merge"
import { 
  useAccount,
  useOfflineSigners, 
} from 'graz'
import { IBaseLoan, ILoanEntity, IPool } from "@/types/api/pool"
import { pureNumberFormat, validateEthereumAddress } from "@/utils"
import Dropdown from "@/components/dropdown"
import { GET_LOAN_ENTITY, GET_POOL_TSS_PUBLIC_KEY, GET_REPAY_ESTIMATED_AMOUNT, GET_REPAY_TRANSACTION } from "@/constants/query"
import { queryClient } from "@/wagmi"
import { useToast } from "@/hooks/useToast"
import { ERROR_MESSAGE, FAILED_WALLET_CONNECTION, SUCCESS_OPERATION, WALLET_INSTALL, WARNING_MESSAGE } from "@/constants/message"
import { TxClient } from "@/cf-client/client"
import { TailSpin } from "react-loader-spinner"
import { useLoanEntity } from "@/hooks/queries/useLoanEntity"
import { CustomProgress } from "@/components/progress"
import { useEstimatedRepayAmount } from "@/hooks/queries/useEstimatedRepayAmount"
import { 
  MsgRequestRepay,
  MsgRequestRepayLock, 
} from "@/cf-client/cfprotocol.loan/tx"
import { ITag } from "@/types/interfaces"
import {
   useConnect,
   useAccount as wagmiUseAccount
} from "wagmi"
import { useAssetProfile } from "@/hooks/queries/useAssetProfile"
import BigNumber from 'bignumber.js'
import Table from "@/components/table"
import { useAuth } from "@/contexts/auth"
import { EthereumIcon } from "@/assets/icons/coins"
import { useTssPublicKey } from "@/hooks/queries/useTssPublicKey"

const tabs = [
  { title: '25%', value: 25 },
  { title: '50%', value: 50 },
  { title: '75%', value: 75 },
  { title: '100%', value: 100 },
]
export interface ISupplyContainer {
  data: IPool
}

export const RepayUSDTContainer = (props: ISupplyContainer) => {
  const { messageApi } = useToast()
  const { authState } = useAuth()

  // metamask
  const { address, connector, isConnected } = wagmiUseAccount();
  const { connectors } = useConnect();

  const [selected, setSelected] = useState<IBaseLoan | undefined>(undefined)
  const [ repay, setRepay ] = useState<number | undefined>(undefined)
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ activeLoan, setActiveLoan ] = useState<ILoanEntity | undefined>(undefined)
  const [ currentTab, setCurrentTab ] = useState<ITag | undefined>(undefined)
  const [ returnAddress, setReturnAddress ] = useState<string | undefined>(address || undefined)

  const { data: account } = useAccount()
  const { data: offlineSigners } = useOfflineSigners()
  const { data: assetLoanEntity } = useLoanEntity()
  const { data: assetProfiles } = useAssetProfile()
  const { data: publicKeyData } = useTssPublicKey()
  const { data: estimatedRepayAmount } = useEstimatedRepayAmount(
    account?.bech32Address, 
    selected?.loan_tx_id,
    ((Number(repay ?? 0) / 100).toString())
  )

  const _is_connected_metamask =
		(address && isConnected && connector === connectors[0]) ?? false;

  /**
   * Filter user's loan entity by creator, and get loans for owner.
   */
  const filterUserLoans = useMemo(() => {
    if (
      !account?.bech32Address || 
      !assetLoanEntity || 
      assetLoanEntity.length < 1
    )
      return []

    const _filteredData = assetLoanEntity.find((e: ILoanEntity) => e.creator === account.bech32Address)
    setActiveLoan(_filteredData)
    if (!_filteredData)
      return []
    
    // get loanEntity by selected chain_symbol
    const _loans = _filteredData.loans.filter(e => e.collateral_symbol === props.data.asset_symbol)
    if (!_loans || _loans.length < 1)
      return []

    return _loans
  }, [assetLoanEntity, account?.bech32Address])

  /**
   * Get decimals for the selected asset's amount
   */
  const getDecimalObj = (asset_id: string) => {
    if (filterUserLoans.length < 1)
      return {
        decimals: 0,
        symbol: ``
      }

    // find an asset matched to target_asset_id in assetProfile array. 
    const _selectedAsset = assetProfiles?.find(e => e.id === asset_id)
    if (!_selectedAsset)
      return {
        decimals: 0,
        symbol: ``
      }

    const _decimals = Number(_selectedAsset.decimals)

    return {
      decimals: 10 ** _decimals,
      symbol: _selectedAsset.symbol
    }
  }

  /**
   * Handle supply
   */
  const handleRepay = async () => {

    if (!window.keplr) {
      return messageApi.Alert(WALLET_INSTALL("Kelpr"));
    }

    if (!account?.bech32Address || !offlineSigners?.offlineSigner) {
      return messageApi.Alert(FAILED_WALLET_CONNECTION(`Kelpr`));
    }

    if (!_is_connected_metamask)
      return messageApi.Alert(FAILED_WALLET_CONNECTION('Metamask'));

    if (!authState.paymentAccount?.address) {
      return messageApi.Alert(FAILED_WALLET_CONNECTION('Unisat')); 
    }

    if (!publicKeyData?.tss_pubkey?.[0].bitcoin) {
      return messageApi.Alert({
        ...WARNING_MESSAGE,
        content: "We couldn't fetch the testnet network. Plese try again later",
      })
    }
    
    if (!returnAddress || !validateEthereumAddress(returnAddress))
      return messageApi.Alert({ ...WARNING_MESSAGE, content: 'Return address should be valid address'})

    if (!activeLoan || !selected)
      return messageApi.Alert({ ...WARNING_MESSAGE, content: 'Select an item to repay.'})

    if (!repay || repay <= 0)
      return messageApi.Alert({ ...WARNING_MESSAGE, content: 'Repay should be greater than 0%'})
    else if (repay && repay > 100)
      return messageApi.Alert({ ...WARNING_MESSAGE, content: 'Repay should be less than 100%'})

    if (!estimatedRepayAmount?.amount_repay)
      return messageApi.Alert({ ...WARNING_MESSAGE, content: 'calcuating estimated USDT amount'})
    
    try {
      setLoading(true)
      
      const res = await authState.sendBitcoinToHTLC(
        account.bech32Address,
        // offlineSigners.offlineSigner,
        messageApi,
        authState,
        authState.paymentAccount.address,
        publicKeyData?.tss_pubkey?.[0].bitcoin,
        BigNumber(estimatedRepayAmount?.amount_repay),
        authState.paymentAccount?.publicKey,
      )
      
      if (!res) {
        setLoading(false)
        return
      }

      const _repayData: MsgRequestRepay = {
        creator: activeLoan.creator,
        loanTxId: Number(selected.loan_tx_id),
        repayPercent: (repay / 100).toString(),
        reserved: "",
        repayAddress: authState.paymentAccount.address,
        returnAddress
      }

      const client = await TxClient(offlineSigners?.offlineSigner);
      const msg = await client.msgRequestRepay(_repayData);
      const { data: result, error } = await client.signAndBroadcast([msg]);

      if (!result || !!error) {
        setLoading(false)
        messageApi.Alert(ERROR_MESSAGE(error as string))
        return
      }

      const getMsgExecuted = result.events.find(e => e.type.toLowerCase() === "message_executed")

      if (!getMsgExecuted) {
        setLoading(false)
        return messageApi.Alert(ERROR_MESSAGE(`Transaction has not been executed!`))
      }

      const getTxId = getMsgExecuted.attributes.find(e => e.key.toLowerCase() === "repay_tx_id")?.value ?? undefined

      if (!getTxId) {
        setLoading(false)
        return messageApi.Alert(ERROR_MESSAGE(`There isn't any transaction Id.`))
      }

      // MsgRequestRepayLock 
      const _repayLockData: MsgRequestRepayLock = {
        creator: res.creator,
        repayTxId: Number(getTxId),
        fromAddress: res.fromAddress,
        senderPubkey: res.senderPubkey,
        assetId: res.assetId,
        amount: res.amount,
        timeout: res.timeout,
        txHash: res.txHash,
        lockAddress: res.lockAddress,
        creationVout: res.creationVout,
        reserved: "",
      }

      const repayLockMsg = await client.msgRequestRepayLock(_repayLockData)
      await client.signAndBroadcast([repayLockMsg]) 

      await invalidateQuery()
      await queryClient.invalidateQueries({
        queryKey: [GET_REPAY_TRANSACTION],
      })

      setLoading(false)
      messageApi.Alert(SUCCESS_OPERATION('Successfully repayed.'))

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
      queryClient.invalidateQueries({ queryKey: [GET_LOAN_ENTITY] }),
      queryClient.invalidateQueries({ queryKey: [GET_REPAY_ESTIMATED_AMOUNT] }),
      queryClient.invalidateQueries({ queryKey: [GET_POOL_TSS_PUBLIC_KEY]}),
      queryClient.invalidateQueries({ queryKey: [GET_POOL_TSS_PUBLIC_KEY] }),
    ])
  }

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [GET_REPAY_ESTIMATED_AMOUNT] })
  }, [repay, selected, account?.bech32Address])

  useEffect(() => {
    invalidateQuery()
  }, [])

  return (
    <div className="w-full mt-[30px]">
      <div className="flex flex-col gap-[10px] mt-8">
        <Typography variant="label-small" className="f-light">
          Select Collateral Symbol
        </Typography>
        <Dropdown.Loans
          list={filterUserLoans}
          value={selected}
          onChange={setSelected}
          className="rounded-lg"
        />
      </div>

      {/* Return address */}
			<Input.Base
				label="Return address"
				value={returnAddress ?? ""}
				placeholder="0xC3D31F37D2B045361c125b686B1BA225e14c23DA"
				icon={<EthereumIcon />}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setReturnAddress(e.target.value)
				}
				classOverride={{
					container: "mt-4",
					inputContainer: "bg-black mt-3 py-3",
					input: "bg-black ml-1",
					value: "text-[13px]",
					icon: "flex justify-center items-center w-7 h-7",
				}}
			/>

      <Input.Number 
        label="Repay ( % )"
        value={repay ?? ''}
        placeholder="0"
        icon={<AmountIcon />}
        innerButtonLabel="Max"
        errorMsg={
          repay && Number(repay) > 100
            ? `Repay should be less than 100%`
            : null
        }
        onMax={() => {
          setRepay(100),
          setCurrentTab(tabs[3])
        }}
        onChange={(e: ChangeEvent<HTMLInputElement>) => 
          setRepay(parseFloat(e.target.value))
        }
        classOverride={{
          container: 'mt-6',
          inputContainer: 'bg-black mt-3',
          input: 'bg-black ml-1',
          value: 'text-[13px] text-[#5e7e8e]',
          icon: 'w-8'
        }}
      />

      <CustomProgress 
        headerLabels={['Current:', 'Max:']}
        headerValues={[`${repay ?? 0} %`, '100%']}
        current={(repay ?? 0).toString()}
        // limit="100"
        classOverride={{
          container: 'mt-4 mb-3',
          text: 'text-[13px]'
        }}
      />

      {/* tabs */}
      <Tab.List 
        tabs={tabs}
        selected={currentTab}
        onSelect={(_t: ITag) => {
          setCurrentTab(_t)
          setRepay(_t.value as number)
        }}
        classOverride={{
          container: 'lg:gap-2 justify-start my-4',
          tabButton: 'w-auto rounded-full px-6 text-[13px]'
        }}
      />

      <Paragraph.List
        label="Estimated Repay Amount" 
        value={`
          ${pureNumberFormat(Number(estimatedRepayAmount?.amount_repay) / getDecimalObj(filterUserLoans[0]?.target_asset_id).decimals, 5)}
          ${getDecimalObj(filterUserLoans[0]?.target_asset_id).symbol}
        `}
        classOverride={{
          container: 'flex-1 pt-4 pb-5 border-b border-[#36f5cf]/10',
        }}
      />

      <Paragraph.List
        label="Estimated Repay Return" 
        value={`
          ${pureNumberFormat(Number(estimatedRepayAmount?.amount_return) / getDecimalObj(props.data.asset_id).decimals, 2)} 
          ${getDecimalObj(props.data.asset_id).symbol}
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
        ) : !selected || Number(repay) <= 0 ? (
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
          label="Repay"
          className={twMerge(
            "w-full bg-[#36f5cf]/10",
            // inscribed && 'bg-[#0aab8b]',
          )}
          onClick={handleRepay}
        />
      )}
      </div>

      {/* Repay Table */}
      <Table.RepayTable data={props.data} />
    </div>
  )
}