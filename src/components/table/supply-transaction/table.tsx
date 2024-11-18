import { Typography } from "@/components/typography"
import { SupplyTableBody } from "./table.body"
import { SupplyTableHeader } from "./table.header"
import { Avatar } from "@/components/avatar"
import { useEffect, useMemo } from "react"
import { useAccount } from "graz"
import { IAssetSuppliedTransaction } from "@/types/api/pool"
import { queryClient } from "@/wagmi"
import { GET_ASSET_BORROW_TRANSACTION } from "@/constants/query"
import { LogoIcon } from "@/assets/icons/logo"
import { useAssetSupplyTransaction } from "@/hooks/queries/useAssetSuppliedTransaction"
import { TailSpin } from "react-loader-spinner"
// const orderArr = ['Ascending', 'Decending']

export const SupplyTransactionTable = () => {
  const { data: account } = useAccount()
  const { data: assetSupplyTransaction, isLoading } = useAssetSupplyTransaction()

  const filterSupplyTransactions = useMemo(() => {
    if (
      !account?.bech32Address || 
      !assetSupplyTransaction || 
      !Array.isArray(assetSupplyTransaction) || 
      assetSupplyTransaction.length < 1
    )
      return []

    const _filteredData = assetSupplyTransaction
      .filter((e: IAssetSuppliedTransaction) => 
        e.creator === account.bech32Address
      )   
    return _filteredData
  }, [assetSupplyTransaction, account?.bech32Address])

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
          <Typography variant="label-small" className="min-w-[40px] semibold text-white">Supplied Assets</Typography>
        </div>
      </div>

      {/* Table */}
      <div 
        className="overflow-auto"
      >
        <div className="pb-3 overflow-auto max-h-[770px] bg-[#090909] rounded-[10px]">
          <table className="w-full">
            <SupplyTableHeader />
            {filterSupplyTransactions.length > 0 && <SupplyTableBody transactions={filterSupplyTransactions}/>}
          </table>
          {filterSupplyTransactions.length < 1 && (
            <div className="flex flex-col justify-center items-center gap-3 h-[136px]">
              <Avatar 
                className="w-[44px] h-[44px]"
                icon={<LogoIcon />}
              />
              <Typography variant="label-small" className="font-bold">You still have No supplied assets</Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}