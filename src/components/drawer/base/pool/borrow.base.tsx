import { ChangeEvent, useEffect, useMemo, useState } from "react"
import Button from "@/components/button"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './style.css'
import dayjs from "dayjs"
import Paragraph from "@/components/paragraph"
import { Input } from "@/components/input"
import { AmountIcon } from "@/assets/icons/amount"
import { Typography } from "@/components/typography"
import { useToast } from "@/hooks/useToast"
import { useAccount, useOfflineSigners } from "graz"
import { useLockBalance } from "@/hooks/queries/useLockBalance"
import { queryClient } from "@/wagmi"
import { GET_ASSET_PROFILE, GET_LOAN_RATE, GET_POOL_LOCK_BALANCE } from "@/constants/query"
import { IBaseLockBalance } from "@/types/api/other"
import { useLoanRate } from "@/hooks/queries/useLoanRate"
import { dayDiffWithSecond, getFixedNumber, pureNumberFormat, validateEthereumAddress } from "@/utils"
import { FAILED_WALLET_CONNECTION, WALLET_INSTALL, WARNING_MESSAGE } from "@/constants/message"
import { MsgRequestLoan } from "@/cf-client/cfprotocol.loan/tx"
import { TxClient } from "@/cf-client/client"
import { EthereumIcon } from "@/assets/icons/coins"
import { twMerge } from "tailwind-merge";
import { TailSpin } from "react-loader-spinner";
import { useAssetProfile } from "@/hooks/queries/useAssetProfile";
import { IAssetProfile } from "@/types/api/pool";

const btcPrice = 60000;
const returnValue = {
  assetId: 1,
  balance: 0,
  interestRate: 0
}

export const BorrowContainer = () => {
  const { messageApi } = useToast()
  const { data: account } = useAccount()
  const { data: offlineSigners } = useOfflineSigners()
  const { data: lockData } = useLockBalance()
  const { data: loanRateData } = useLoanRate()
  const { data: assetProfiles } = useAssetProfile()
  
  const [ loading, setLoading ] = useState<boolean>(false)
  const [ collateralAmount, setCollateralAmount ] = useState<number | undefined>(undefined)
  const [ loanRate, setLoanRate ] = useState<number | undefined>(undefined)
  const [ interestRate, setInterestRate ] = 
    useState<number | undefined>(getFixedNumber(Number(loanRateData?.min_interest_rate ?? 0) * 100))
  const [ activeLock, setActiveLock ] = useState<IBaseLockBalance | undefined>(undefined)
  const [ loanAddress, setLoanAddress ] = useState<string | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  // Get locked balances with balance and apy from lockData.
  const getLockedBalanceObj = useMemo(() => {
    if (
      !account?.bech32Address || 
      !lockData || 
      !lockData.lock_balance || 
      lockData.lock_balance.length < 1 ||
      !assetProfiles ||
      Array.isArray(assetProfiles) && assetProfiles.length < 1
    )
      return returnValue

    // find if there's BTC in asset profiles
    const _filterBTC = assetProfiles?.find((e: IAssetProfile) => e.symbol === 'BTC')
    if (!_filterBTC)
      return returnValue

    // find if there's my balances in lock_balance
    const _filteredData = 
      lockData.lock_balance
      .find((e: IBaseLockBalance) => e.creator === account.bech32Address)

    setActiveLock(_filteredData)
    if (!_filteredData || _filteredData.balances.length < 1) 
      return returnValue

    // find if there's btc in my lock_balance
    const balanceObj = _filteredData.balances.find(e => e.asset_id === _filterBTC.id)
    if (!balanceObj)
      return returnValue

    return {
      assetId: balanceObj.asset_id,
      balance: Number(balanceObj.balance),
      interestRate: Number(balanceObj.interest_rate)
    }
  }, [lockData, account?.bech32Address, assetProfiles])

  // calculate loanRate
  const calculateEstimatedLoanAmount = useMemo(() => {
    if (!collateralAmount || !loanRate)
      return undefined
    return collateralAmount * (loanRate ?? 0) * btcPrice / 100
  }, [collateralAmount, loanRate])

  // calculate max collateral amount based on lock-balance
  const calcuateMaxCollateralAmount = useMemo(() => {
    return getFixedNumber(getLockedBalanceObj.balance / 1e8)
  }, [lockData, assetProfiles])

  // calcuate different between start to end date
  const calculateDateDiff = useMemo(() => {
    const _end_date = dayjs(endDate).format()
    const _diff_sec = dayDiffWithSecond( _end_date)

    if (_diff_sec === 'NaN')
      return 0
    else if (_diff_sec < 0) { 
      return 0;
    }
    return Number((_diff_sec / 5).toFixed(0))
    
  }, [endDate])

  /**
   * Handle borrow
   */
  const handleBorrow = async () => {

    if (!window.keplr) {
      return messageApi.Alert(WALLET_INSTALL("Kelpr"));
    }
    if (!account?.bech32Address || !offlineSigners?.offlineSigner) {
      return messageApi.Alert(FAILED_WALLET_CONNECTION);
    }
    
    // check whether there is active borrowable asset or not
    if (!activeLock)
      return messageApi.Alert({ ...WARNING_MESSAGE, content: 'There is no any suppliable asset'})

    // check whether collateral amount is larger than 0 or less than max suppliable amount
    if (!collateralAmount)
      return messageApi.Alert({ ...WARNING_MESSAGE, content: 'Collateral amount should be larger than 0'})
    else if (collateralAmount > calcuateMaxCollateralAmount)
      return messageApi.Alert({ ...WARNING_MESSAGE, content: 'Collateral amount should be less than borrowabled amount'})

    // check whether interest_rate is valid number and larger than min_interest_rate
    if (!interestRate || getFixedNumber(Number(loanRateData?.min_interest_rate ?? 0) * 100) > (interestRate ?? 0))
      return messageApi.Alert({ ...WARNING_MESSAGE, content: 'Set interest rate'})

    // check whether loan_Address is undefined or ethereum address
    if (!loanAddress || !validateEthereumAddress(loanAddress))
      return messageApi.Alert({ ...WARNING_MESSAGE, content: 'Loan address should be valid ethereum address.'})
    
    // check whether loan duration is selected correctly or not
    if (calculateDateDiff < 0)
      return messageApi.Alert({ ...WARNING_MESSAGE, content: `Duration date should be later than ${dayjs().format("MM/DD/YYY")}`})  
    
    if (calculateDateDiff > Number(loanRateData?.max_duration))
      return messageApi.Alert({ ...WARNING_MESSAGE, content: `Duration should be less than max_duration`})  
    
    if (!loanRate || loanRate > Number(loanRateData?.max_loan_rate))
      return messageApi.Alert({ ...WARNING_MESSAGE, content: `Loan rate should be less thatn ${loanRateData?.max_loan_rate}`})  

    try {
      setLoading(true)

      const _loanData: MsgRequestLoan = {
        creator: activeLock.creator,
        assetId: Number(getLockedBalanceObj.assetId),
        amount: (collateralAmount * 1e8).toString(),
        interestRate: interestRate.toString(),
        loanRate: loanRate.toString(),
        duration: calculateDateDiff,
        loanAddress,
        reserved: "",
      }

      const client = await TxClient(offlineSigners?.offlineSigner);
      let msg = await client.msgRequestLoan(_loanData);
      const result = await client.signAndBroadcast([msg]);

      setLoading(false)
      await invalidateQuery()

      messageApi.Alert(
        {
          type: 'Success',
          title: 'Successfully borrowed.',
          link: `https://explorer.ordibank.org/ordibank/tx/${result.transactionHash}`,
        },
        6,
      )

      console.log("Borrow result ====>", result);
    } catch (error) {
      setLoading(false)
      console.log("Borrow Error is ===>", error)
    }
  }

  // invalidate queries
  const invalidateQuery = async () => {
    Promise.all([
      queryClient.invalidateQueries({ queryKey: [GET_POOL_LOCK_BALANCE] }),
      queryClient.invalidateQueries({ queryKey: [GET_LOAN_RATE] }),
      queryClient.invalidateQueries({ queryKey: [GET_ASSET_PROFILE] }),
    ])
  }

  useEffect(() => {
    invalidateQuery()
  }, [])
  
  return (
    <div className="w-full mt-[30px]">

      {/* Collateral Amount */}
      <Input 
        label="Collateral Amount ( BTC )"
        value={collateralAmount ?? ''}
        placeholder="0.00"
        icon={<AmountIcon />}
        innerButtonLabel="Max"
        onMax={() => setCollateralAmount(calcuateMaxCollateralAmount)}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setCollateralAmount(Number(e.target.value))
        }
        classOverride={{
          container: 'mt-4',
          inputContainer: 'bg-black mt-3',
          input: 'bg-black ml-1',
          value: 'text-[13px] text-[#5e7e8e]',
          icon: 'w-8'
        }}
      />

      {/* Loan Rate */}
      <Input 
        label="Loan Rate ( % )"
        value={loanRate ?? ''}
        placeholder="0.00"
        icon={<AmountIcon />}
        innerButtonLabel="Max"
        onMax={() => setLoanRate(Number(loanRateData?.max_loan_rate) * 100)}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setLoanRate(Number(e.target.value || 0))
        }
        classOverride={{
          container: 'mt-4',
          inputContainer: 'bg-black mt-3',
          input: 'bg-black ml-1',
          value: 'text-[13px] text-[#5e7e8e]',
          icon: 'w-8'
        }}
      />

      {/* Interest Rate */}
      <Input 
        label="Interest Rate ( % )"
        value={interestRate ?? ''}
        placeholder="0.00"
        icon={<AmountIcon />}
        innerButtonLabel="Min"
        onMax={() => setInterestRate( getFixedNumber(Number(loanRateData?.min_interest_rate ?? 0) * 100) )}
        errorMsg={
          loanRateData && getFixedNumber(Number(loanRateData?.min_interest_rate ?? 0) * 100) > (interestRate ?? 0) 
            ? `Interest rate should be larger than ${(Number(loanRateData?.min_interest_rate) * 100).toFixed(0)} %`
            : null
        }
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setInterestRate(Number(e.target.value || 0))
        }
        classOverride={{
          container: 'mt-4',
          inputContainer: 'bg-black mt-3',
          input: 'bg-black ml-1',
          value: 'text-[13px] text-[#5e7e8e]',
          icon: 'w-8'
        }}
      />

      {/* Loan address */}
      <Input 
        label="Loan address"
        value={loanAddress ?? '' }
        placeholder="0xC3D31F37D2B045361c125b686B1BA225e14c23DA"
        icon={<EthereumIcon />}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setLoanAddress(e.target.value)
        }
        classOverride={{
          container: 'mt-4',
          inputContainer: 'bg-black mt-3 py-3',
          input: 'bg-black ml-1',
          value: 'text-[13px]',
          icon: 'flex justify-center items-center w-7 h-7'
        }}
      />

      {/* Loan duration */}
      <div className="mt-5">
        <Typography variant="label-small" className="">Loan Duration</Typography>
        <DatePicker 
          className="mt-3" 
          selected={endDate} 
          onChange={(date) => setEndDate(date)} 
        />
        <div className="flex gap-4">
          <Typography variant="label-small" className="mt-2 text-[#36f5cf]/60">
            Duration: <span className="text-gray-200">{pureNumberFormat(calculateDateDiff ?? 0)}</span>
          </Typography>
          <Typography variant="label-small" className="mt-2 text-[#36f5cf]/50">
            Max Duration: <span className="text-gray-200">{pureNumberFormat(loanRateData?.max_duration)}</span>
          </Typography>
        </div>
      </div>

      <Paragraph.List 
        label="Borrowable limit" 
        value={`${pureNumberFormat(calcuateMaxCollateralAmount * btcPrice * Number(loanRateData?.max_loan_rate))} USDT`}
        classOverride={{
          container: 'flex-1 pt-5 pb-5 border-b border-[#36f5cf]/10',
        }}
      />
      <Paragraph.List 
        label="Borrowable amount" 
        value={`${getFixedNumber(Number(loanRateData?.max_loan_rate) * (collateralAmount ?? 0) * btcPrice)} USDT`}
        classOverride={{
          container: 'flex-1 pt-4 pb-5 border-b border-[#36f5cf]/10',
        }}
      />
      <Paragraph.List 
        label="Total APY" 
        value={`${pureNumberFormat(getLockedBalanceObj.interestRate * 100)} %`
        }
        classOverride={{
          container: 'flex-1 pt-4 pb-5 border-b border-[#36f5cf]/10',
        }}
      />
      <Paragraph.List 
        label="Estimated loan amount" 
        value={`${pureNumberFormat(calculateEstimatedLoanAmount)} USDT`
        }
        classOverride={{
          container: 'flex-1 py-[10px]',
        }}
      />

      

      {/* Borrow Button */}
      <div className="flex flex-col gap-2.5 mt-8 ">
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
        ) : (
          <Button.Basic 
            label="Borrow"
            className={twMerge(
              "w-full bg-[#0aab8b]",
              !collateralAmount || !loanRate ? 'bg-[#36f5cf]/10' : 'bg-[#0aab8b]',
              // 'hover:bg-[#0aab8b]'
            )}
            onClick={handleBorrow}
          />
        )}
      </div>
    </div>
  )
}