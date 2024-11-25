import { Typography } from "@/components/typography"
import { SupplyUSDTTableBody } from "./table.body"
import { SupplyUSDTTableHeader } from "./table.header"
import { Avatar } from "@/components/avatar"
import { useEffect, useMemo } from "react"
import { useAccount } from "graz"
import { IUSDTSuppliedTransaction } from "@/types/api/pool"
import { queryClient } from "@/wagmi"
import { GET_USDT_SUPPLY_TRANSACTION } from "@/constants/query"
import { LogoIcon } from "@/assets/icons/logo"
import { useUSDTSupplyTransaction } from "@/hooks/queries/useUSDTSuppliedTransaction"
import { TailSpin } from "react-loader-spinner"
// const orderArr = ['Ascending', 'Decending']

export const SupplyUSDTTransactionTable = () => {
  const { data: account } = useAccount()
  const { data: usdtSupplyTransaction, isLoading } = useUSDTSupplyTransaction()

  const filterSupplyTransactions = useMemo(() => {
    if (
      !account?.bech32Address || 
      !usdtSupplyTransaction || 
      !Array.isArray(usdtSupplyTransaction) || 
      usdtSupplyTransaction.length < 1
    )
      return []

    const _filteredData = usdtSupplyTransaction
      .filter((e: IUSDTSuppliedTransaction) => 
        e.supplier === account.bech32Address
      )   
    return _filteredData
  }, [usdtSupplyTransaction, account?.bech32Address])

  // update asset_lock_transaction every 1 mins to display updated status.
  useEffect(() => {
    const timer = window.setInterval(async () => {
      await queryClient.invalidateQueries({
        queryKey: [GET_USDT_SUPPLY_TRANSACTION],
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
            <SupplyUSDTTableHeader />
            {filterSupplyTransactions.length > 0 && <SupplyUSDTTableBody transactions={filterSupplyTransactions}/>}
          </table>
          {filterSupplyTransactions.length < 1 && (
            <div className="flex flex-col justify-center items-center gap-3 h-[136px]">
              <Avatar 
                className="w-[44px] h-[44px]"
                icon={<LogoIcon />}
              />
              <Typography variant="label-small" className="font-bold">No Assets Supplied</Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}