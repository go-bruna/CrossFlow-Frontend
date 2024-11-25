import { Typography } from "@/components/typography"
import { RepayTableBody } from "./table.body"
import { RepayTableHeader } from "./table.header"
import { Avatar } from "@/components/avatar"
import { useEffect, useMemo } from "react"
import { useAccount } from "graz"
import { IPool, IRepayTransaction } from "@/types/api/pool"
import { queryClient } from "@/wagmi"
import { LogoIcon } from "@/assets/icons/logo"
import { TailSpin } from "react-loader-spinner"
import { GET_REPAY_TRANSACTION } from "@/constants/query"
import { useRepayTransaction } from "@/hooks/queries/useRepayTransaction"
// const orderArr = ['Ascending', 'Decending']

export type Props = {
  data: IPool
}

export const RepayTransactionTable = (props: Props) => {
  const { data: account } = useAccount()
  const { data: repayTransaction, isLoading } = useRepayTransaction()

  const filterRepayTransactions = useMemo(() => {
    if (
      !account?.bech32Address || 
      !repayTransaction || 
      !Array.isArray(repayTransaction) || 
      repayTransaction.length < 1
    )
      return []

    const _filteredData = repayTransaction
      .filter((e: IRepayTransaction) => 
        e.creator === account.bech32Address &&
        props.data.chain_symbol === e.repay_target_chain
      )   
    return _filteredData
  }, [repayTransaction, account?.bech32Address])

  // update asset_lock_transaction every 1 mins to display updated status.
  useEffect(() => {
    const timer = window.setInterval(async () => {
      await queryClient.invalidateQueries({
        queryKey: [GET_REPAY_TRANSACTION],
      })
    }, 60 * 1000)
    return () => {
      window.clearInterval(timer)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-1 justify-center items-center h-[160px]">
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
    )
  }
  
  return (
    <div className="flex flex-col gap-4 my-10 mb-[70px] lg:mt-[45px] w-full">
      {/* Sort by */}
      <div className="flex items-center gap-[4] lg:gap-8">
        <div className="flex items-center">
          <Typography variant="label-small" className="min-w-[40px] semibold text-white">Repay Transactions</Typography>
        </div>
      </div>

      {/* Table */}
      <div 
        className="overflow-auto"
      >
        <div className="pb-3 overflow-auto max-h-[770px] bg-[#090909] rounded-[10px]">
          <table className="w-full">
            <RepayTableHeader />
            {
              filterRepayTransactions.length > 0 && 
              <RepayTableBody 
                transactions={filterRepayTransactions}
              />
            }
          </table>
          {filterRepayTransactions.length < 1 && (
            <div className="flex flex-col justify-center items-center gap-3 h-[136px]">
              <Avatar 
                className="w-[44px] h-[44px]"
                icon={<LogoIcon />}
              />
              <Typography variant="label-small" className="font-bold">No assets repaid</Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}