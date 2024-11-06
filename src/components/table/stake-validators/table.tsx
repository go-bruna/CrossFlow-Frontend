import { Typography } from "@/components/typography"
import { StakeValidatorTableBody } from "./table.body"
import { StakeValidatorTableHeader } from "./table.header"
import { Avatar } from "@/components/avatar"
// import { useAssetLockTransaction } from "@/hooks/queries/useAssetLockTransaction"
// import { useEffect, useMemo } from "react"
// import { useAccount } from "graz"
// import { IBaseLockTransaction } from "@/types/api/pool"
// import { queryClient } from "@/wagmi"
// import { GET_ASSET_LOCK_TRANSACTION } from "@/constants/query"
import { LogoIcon } from "@/assets/icons/logo"
import { useStakeValidators } from "@/hooks/queries/useStakeValidators"
import StakingSkeleton from "@/screens/stake/skeleton"
// const orderArr = ['Ascending', 'Decending']

export const StakeValidatorTable = () => {
  // const { data: account } = useAccount()
  const { data: validators, isLoading } = useStakeValidators()

  // update asset_lock_transaction every 1 mins to display updated status.
  // useEffect(() => {
  //   const timer = window.setInterval(async () => {
  //     await queryClient.invalidateQueries({
  //       queryKey: [GET_ASSET_LOCK_TRANSACTION],
  //     })
  //   }, 60 * 1000)
  //   return () => {
  //     window.clearInterval(timer)
  //   }
  // }, [])
  
  if (isLoading) {
		return <StakingSkeleton />
	}
  
  return (
    <div className="flex flex-col gap-4 mt-8 mb-[70px] w-full">
      {/* Sort by */}
      <div className="flex items-center gap-[4] lg:gap-8">
        <div className="flex items-center">
          <Typography variant="label-small" className="min-w-[40px] semibold text-white">Validators</Typography>
        </div>
      </div>

      {/* Table */}
      <div 
        className="overflow-auto"
      >
        <div className="pb-3 overflow-auto max-h-[770px] bg-[#090909] rounded-[10px]">
          <table className="w-full">
            <StakeValidatorTableHeader />
            {validators && validators.length > 0 && <StakeValidatorTableBody validators={validators}/>}
          </table>
          {!validators || validators.length < 1 && (
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