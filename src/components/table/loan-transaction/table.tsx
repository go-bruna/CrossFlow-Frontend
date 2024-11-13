import { Typography } from "@/components/typography"
import { LoanTableBody } from "./table.body"
import { LoanTableHeader } from "./table.header"
import { Avatar } from "@/components/avatar"
import { useEffect, useMemo } from "react"
import { useAccount } from "graz"
import { IAssetBorrowedTransaction } from "@/types/api/pool"
import { queryClient } from "@/wagmi"
import { GET_ASSET_BORROW_TRANSACTION } from "@/constants/query"
import { LogoIcon } from "@/assets/icons/logo"
import { useAssetBorrowTransaction } from "@/hooks/queries/useAssetBorrowedTransaction"
import { TailSpin } from "react-loader-spinner"
// const orderArr = ['Ascending', 'Decending']

interface Props {
  asset_id: string
}
export const LoanTransactionTable = (props: Props) => {
  const { data: account } = useAccount()
  const { data: assetBorrowTransaction, isLoading } = useAssetBorrowTransaction()

  const filterBorrowTransactions = useMemo(() => {
    if (
      !account?.bech32Address || 
      !assetBorrowTransaction || 
      !Array.isArray(assetBorrowTransaction) || 
      assetBorrowTransaction.length < 1
    )
      return []

    const _filteredData = assetBorrowTransaction
      .filter((e: IAssetBorrowedTransaction) => 
        e.creator === account.bech32Address &&
        e.collateral_id === props.asset_id
      )   
    return _filteredData
  }, [assetBorrowTransaction, account?.bech32Address])

  // update asset_lock_transaction every 1 mins to display updated status.
  useEffect(() => {
    const timer = window.setInterval(async () => {
      await queryClient.invalidateQueries({
        queryKey: [GET_ASSET_BORROW_TRANSACTION],
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
          <Typography variant="label-small" className="min-w-[40px] semibold text-white">Borrowed Assets</Typography>
        </div>
      </div>

      {/* Table */}
      <div 
        className="overflow-auto"
      >
        <div className="pb-3 overflow-auto max-h-[770px] bg-[#090909] rounded-[10px]">
          <table className="w-full">
            <LoanTableHeader />
            {filterBorrowTransactions.length > 0 && <LoanTableBody transactions={filterBorrowTransactions}/>}
          </table>
          {filterBorrowTransactions.length < 1 && (
            <div className="flex flex-col justify-center items-center gap-3 h-[136px]">
              <Avatar 
                className="w-[44px] h-[44px]"
                icon={<LogoIcon />}
              />
              <Typography variant="label-small" className="font-bold">You still have No loan</Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}