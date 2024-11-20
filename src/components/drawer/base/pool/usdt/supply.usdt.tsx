import { 
  useEffect,
  ChangeEvent, 
  useState, 
  useMemo,
} from "react"
import Button from "@/components/button"
import Table from "@/components/table"
import { Input } from "@/components/input"
import { AmountIcon } from "@/assets/icons/amount"
import { twMerge } from "tailwind-merge"
import { GET_MAX_INTEREST_RATE, GET_USDT_SUPPLY_TRANSACTION } from "@/constants/query"
import { queryClient } from "@/wagmi"
import { useToast } from "@/hooks/useToast"
import { ERROR_MESSAGE, FAILED_WALLET_CONNECTION, SUCCESS_OPERATION, WALLET_INSTALL, WARNING_MESSAGE } from "@/constants/message"
import { TxClient } from "@/cf-client/client"
import { MsgRequestSupplyUsdt } from "@/cf-client/cfprotocol.lock/tx"
import { TailSpin } from "react-loader-spinner"
import { useMaxInterestRate } from "@/hooks/queries/useMaxInterestRate"
import {
  useConnect as wagmiUseConnect,
  useAccount as wagmiUseAccount
} from "wagmi"
import { useWeb3Context } from "@/contexts/web3"
import { useAccount, useOfflineSigners } from "graz"
import { IPool } from "@/types/api/pool"
import { toWei } from "@/utils"

export interface Props {
  data: IPool
}

export const SupplyUSDTContainer = (props: Props) => {
  const { messageApi } = useToast()
  
  // ether metamask
  const { data: account } = useAccount()
  const { data: offlineSigners } = useOfflineSigners()
	const { address, connector, isConnected } = wagmiUseAccount();
	const { connectors } = wagmiUseConnect();

  const { 
    getTokenBalance,
    approveUSDT,  
  } = useWeb3Context()

  const [ balance, setBalance ] = useState<number | undefined>(undefined)
  const [ amount, setAmount ] = useState<number | undefined>(0)
  const [ rate, setRate ] = useState<number | undefined>(0)
  const [ loading, setLoading ] = useState<boolean>(false)
  const { data: maxRate } = useMaxInterestRate()
  
  const _is_connected_metamask =
		(address && isConnected && connector === connectors[0]) ?? false;

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

    if (!address || !_is_connected_metamask)
      return messageApi.Alert(FAILED_WALLET_CONNECTION('Metamask'));

    if (!amount || amount <= 0) {
      return messageApi.Alert({...WARNING_MESSAGE});
    }

    if (rate && rate > (Number(maxRate?.max_interest_rate ?? 0) * 100))
      return

    try {
      setLoading(true)

      const approve = await approveUSDT(amount)
      if (!approve) {
        setLoading(false)
        return
      }
      const _supplyData: MsgRequestSupplyUsdt = {
        creator: account?.bech32Address,
        assetId: Number(props.data.asset_id),
        chainSymbol: props.data.chain_symbol,
        amount: toWei(amount).toString(),
        interestRate: ((rate || 0) / 100).toString(),
        senderAddress: address
      }

      const client = await TxClient(offlineSigners?.offlineSigner);
      let msg = await client.msgRequestSupplyUSDT(_supplyData);
      await client.signAndBroadcast([msg]);
      await invalidateQuery()

      setLoading(false)

      messageApi.Alert(SUCCESS_OPERATION('Successfully supplied USDT.'))

      await queryClient.invalidateQueries({
        queryKey: [GET_USDT_SUPPLY_TRANSACTION],
      })
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
      queryClient.invalidateQueries({ queryKey: [GET_MAX_INTEREST_RATE] }),
    ])
  }

  // get balance in holesky network
  useMemo(async () => {
    const _balance = await getTokenBalance()
    setBalance(_balance)
  }, [address])

  useEffect(() => {
    invalidateQuery()
  }, [])

  return (
    <div className="w-full mt-[30px]">

      {/* USDT amount to supply */}
      <Input 
        label="Input USDT amount to supply"
        value={amount ?? ''}
        placeholder="0"
        icon={<AmountIcon />}
        innerButtonLabel="Max"
        errorMsg={
          amount && amount > (balance || 0)
            ? `Amount should be less than ${balance}`
            : null
        }
        onMax={() => setAmount(balance ?? 0)}
        onChange={(e: ChangeEvent<HTMLInputElement>) => 
          setAmount(Number(e.target.value || 0))
        }
        classOverride={{
          container: 'mt-8',
          inputContainer: 'bg-black mt-3',
          input: 'bg-black ml-1',
          value: 'text-[13px] text-[#5e7e8e]',
          icon: 'w-8'
        }}
      />

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

      {/* Button group */}
      <div className="flex flex-col gap-6 pt-6">
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
        ) : Number(amount) <= 0 ? (
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
      <Table.SupplyUSDTTransaction />
      
    </div>
  )
}

