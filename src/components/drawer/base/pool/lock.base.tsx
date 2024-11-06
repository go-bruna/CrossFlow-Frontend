import { ChangeEvent, useEffect, useState } from "react"
import Button from "@/components/button"
import { Input } from "@/components/input"
import { AmountIcon } from "@/assets/icons/amount"
import { Typography } from "@/components/typography"
import { twMerge } from "tailwind-merge"
import { useAccount, useOfflineSigners } from 'graz'
import { useAuth } from "@/contexts/auth"
import validate from "bitcoin-address-validation"
import BigNumber from 'bignumber.js'
import { Check_Circle_Icon } from "@/assets/icons/check"
import Dropdown from "@/components/dropdown"
import { useTssPublicKey } from "@/hooks/queries/useTssPublicKey"
import { queryClient } from "@/wagmi"
import { GET_ASSET_LOCK_TRANSACTION, GET_POOL_TSS_PUBLIC_KEY } from "@/constants/query"
import { useGetChainStats } from "@/hooks/queries/useGetChainStats"
import { calcBTCBalance } from "@/utils/btc_utils"
import { useToast } from "@/hooks/useToast"
import { WALLET_NOT_CONNECTED, WARNING_MESSAGE } from "@/constants/message"
import { BTC_FEE_RATE } from "@/constants"
import { TailSpin } from "react-loader-spinner"
import Table from "@/components/table"

const dropdownArr = ['Bitcoin']

export const LockContainer = () => {
  const { messageApi } = useToast()
  const { authState } = useAuth()

  const [loading, setLoading] = useState<boolean>(false)
  const [ amount, setAmount ] = useState<number | undefined>(undefined)
  const [selected, setSelected] = useState<string>(dropdownArr[0])

  const { data: account } = useAccount()
  const { data: offlineSigners } = useOfflineSigners()
  
  const { data: publicKeyData } = useTssPublicKey()
  const chainStats = useGetChainStats(authState.paymentAccount?.address ?? '')
  const btcAddress = authState?.paymentAccount?.address
  
  const handleLock = async () => {
    if (!authState.paymentAccount?.publicKey) {
      return messageApi.Alert(WALLET_NOT_CONNECTED)
    } else if (!btcAddress) {
      messageApi.Alert({
        ...WARNING_MESSAGE,
        content:
          'BTC address is not existed. please try to connect your wallet again.',
      })
      return
    } else if (!account?.bech32Address || !offlineSigners?.offlineSigner) {
      messageApi.Alert({
        ...WARNING_MESSAGE,
        content:
          'Kelpr address is not existed. please try to connect your wallet again.',
      })
      return
    } else if (!publicKeyData?.tss_pubkey?.[0].bitcoin) {
      messageApi.Alert({
        ...WARNING_MESSAGE,
        content: "We couldn't fetch the testnet network. Plese try again later",
      })
      return
    } else if (!amount) {
      messageApi.Alert({
        ...WARNING_MESSAGE,
        content: 'Please enter a collateral amount',
      })
      return
    } else if (amount > calcBTCBalance(chainStats) / 1e8) {
      // console.log("===chain status====", chainStats)
      messageApi.Alert({
        ...WARNING_MESSAGE,
        content: 'Insufficient amount',
      })
      return
    } else if (amount * 1e8 <= BTC_FEE_RATE) {
      messageApi.Alert({
        ...WARNING_MESSAGE,
        content: `Amount should be greater than ${BTC_FEE_RATE} satoshi.`,
      })
      return
    }

    try {
      setLoading(true)
      const res = await authState.sendBitcoinToHTLC(
        account.bech32Address,
        offlineSigners.offlineSigner,
        messageApi,
        authState,
        btcAddress,
        publicKeyData?.tss_pubkey?.[0].bitcoin,
        BigNumber(amount).multipliedBy(1e8),
        authState.paymentAccount?.publicKey,
      )
      console.log('res = ', res)
      setLoading(false)
      if (!res) {
        return
      }
  
      messageApi.Alert(
        {
          type: 'Success',
          title: 'Successfully locked collateral.',
          link: `https://explorer.ordibank.org/ordibank/tx/${res.transactionHash}`,
        },
        6,
      )
  
      // invalid asset_lock_transaction whenever lock succeeds.
      await queryClient.invalidateQueries({
        queryKey: [GET_ASSET_LOCK_TRANSACTION],
      })

    } catch (error) {
      setLoading(false)
      console.log("lock error ---->", error)
    }
  }

  // invalidate queries
  const invalidateQuery = async () => {
    Promise.all([
      queryClient.invalidateQueries({ queryKey: [GET_POOL_TSS_PUBLIC_KEY] }),
    ])
  }

  useEffect(() => {
    invalidateQuery()
  }, [])

  return (
    <div className="w-full mt-[30px]">
      <Input 
        label={'From address'}
        value={authState?.paymentAccount?.address || ''}
        placeholder="2MxRhjh7HAXPXvBuhaa1VW3vbR3EK2FmFpb"
        suffixIcon={validate(btcAddress || '') ? <Check_Circle_Icon /> : null}
        classOverride={{
          container: 'mt-[14px]',
          inputContainer: 'bg-black mt-[14px]',
          input: 'bg-black ml-1',
          value: 'text-[13px] text-[#5e7e8e]',
          icon: 'w-8'
        }}
        disabled={true}
      />

      <div className="flex flex-col gap-[10px] mt-8">
        <Typography variant="label-small" className="f-light">
          Select token
        </Typography>
        <Dropdown.Basic
          list={dropdownArr}
          value={selected}
          onChange={setSelected}
          className="rounded-lg"
        />
      </div>

      <Input 
        label={'Amount'}
        type="number"
        value={amount ?? ''}
        placeholder="0.00"
        icon={<AmountIcon />}
        innerButtonLabel="Max"
        onMax={() => setAmount(calcBTCBalance(chainStats) / 1e8)}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setAmount(Number(e.target.value || 0))
        }
        classOverride={{
          container: 'mt-8',
          inputContainer: 'bg-black mt-[14px]',
          input: 'bg-black ml-1',
          value: 'text-[13px] text-[#5e7e8e]',
          icon: 'w-8'
        }}
      />

      {/* Lock Button */}
      <div className="flex mt-8 ">
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
        ) : (
          <Button.Basic 
            label={ !amount || amount < 0 
              ? 'Enter valid amount'
              : amount && amount > calcBTCBalance(chainStats) / 1e8 
                ? "Insufficient amount"
                : "Lock"
            }
            className={twMerge(
              "w-full bg-[#36f5cf]/10",
              amount && calcBTCBalance(chainStats) / 1e8 > amount && 'bg-[#0aab8b]'
              // 'hover:bg-[#0aab8b]'
            )}
            onClick={ 
              amount && calcBTCBalance(chainStats) / 1e8 > amount 
                ? handleLock 
                : () => {}
            }
          />
        )}
      </div>

      {/* Locked Table */}
      <Table.LockTransaction />
    </div>
  )
}