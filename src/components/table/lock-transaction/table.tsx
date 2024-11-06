import { Typography } from "@/components/typography"
import { LockTableBody } from "./table.body"
import { LockTableHeader } from "./table.header"
import { Avatar } from "@/components/avatar"
import { useAssetLockTransaction } from "@/hooks/queries/useAssetLockTransaction"
import { useEffect, useMemo } from "react"
import { useAccount } from "graz"
import { IBaseLockTransaction } from "@/types/api/pool"
import { queryClient } from "@/wagmi"
import { GET_ASSET_LOCK_TRANSACTION } from "@/constants/query"
import { LogoIcon } from "@/assets/icons/logo"
// const orderArr = ['Ascending', 'Decending']

export const LockTransactionTable = () => {
  const { data: account } = useAccount()
  const { data: assetLockTransaction } = useAssetLockTransaction()

  const filterLockedTransactions = useMemo(() => {
    if (
      !account?.bech32Address || 
      !assetLockTransaction || 
      !assetLockTransaction.asset_lock_transaction || 
      assetLockTransaction.asset_lock_transaction.length < 1
    )
      return []

    const _filteredData = assetLockTransaction.asset_lock_transaction
      .filter((e: IBaseLockTransaction) => 
        e.creator === account.bech32Address
      )   
    return _filteredData
  }, [assetLockTransaction, account?.bech32Address])

  // update asset_lock_transaction every 1 mins to display updated status.
  useEffect(() => {
    const timer = window.setInterval(async () => {
      await queryClient.invalidateQueries({
        queryKey: [GET_ASSET_LOCK_TRANSACTION],
      })
    }, 60 * 1000)
    return () => {
      window.clearInterval(timer)
    }
  }, [])
  
  return (
    <div className="flex flex-col gap-4 my-10 mb-[70px] lg:mt-[45px] w-full">
      {/* Sort by */}
      <div className="flex items-center gap-[4] lg:gap-8">
        <div className="flex items-center">
          <Typography variant="label-small" className="min-w-[40px] semibold text-white">Locked Assets</Typography>
        </div>
      </div>

      {/* Table */}
      <div 
        className="overflow-auto"
      >
        <div className="pb-3 overflow-auto max-h-[770px] bg-[#090909] rounded-[10px]">
          <table className="w-full">
            <LockTableHeader />
            {filterLockedTransactions.length > 0 && <LockTableBody transactions={filterLockedTransactions}/>}
          </table>
          {filterLockedTransactions.length < 1 && (
            <div className="flex flex-col justify-center items-center gap-3 h-[136px]">
              <Avatar 
                className="w-[44px] h-[44px]"
                icon={<LogoIcon />}
              />
              <Typography variant="label-small" className="font-bold">You still have No locked assets</Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}