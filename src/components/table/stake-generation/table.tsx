import { Typography } from "@/components/typography"
import { StakeGenerationTableBody } from "./table.body"
import { StakeGenerationTableHeader } from "./table.header"
import { Avatar } from "@/components/avatar"
import { LogoIcon } from "@/assets/icons/logo"
import StakingSkeleton from "@/screens/stake/skeleton"
import { useStakeDelegations } from "@/hooks/queries/useStakeDelegations"
import { useAccount } from "graz"
import { useEffect, useMemo } from "react"
import { GET_STAKE_ALL_DELEGATIONS } from "@/constants/query"
import { queryClient } from "@/wagmi"
import { IStakeDelegation } from "@/types/api/stake"

export const StakeGenerationTable = () => {
  const { data: account } = useAccount()
  const { data: delegationData, isLoading } = useStakeDelegations(account?.bech32Address)

  const filterDelegations = useMemo(() => {
    if (!account?.bech32Address)
      return []
    if (!delegationData || delegationData.length < 1)
      return []

    const _filter = delegationData.filter((e: IStakeDelegation) => e.delegation.delegator_address === account?.bech32Address)
    return _filter
  }, [account?.bech32Address, delegationData])

  const invalidateQuery = async () => {
    await queryClient.invalidateQueries({ queryKey: [GET_STAKE_ALL_DELEGATIONS] })
  }

  useEffect(() => {
    invalidateQuery()
  }, [])
  
  if (isLoading) {
		return <StakingSkeleton />
	}
  
  return (
    <div className="flex flex-col gap-4 mt-8 mb-[70px] w-full">
      {/* Sort by */}
      <div className="flex items-center gap-[4] lg:gap-8">
        <div className="flex items-center">
          <Typography variant="label-small" className="min-w-[40px] semibold text-white">Delegateions</Typography>
        </div>
      </div>

      {/* Table */}
      <div 
        className="overflow-auto"
      >
        <div className="pb-3 overflow-auto max-h-[770px] bg-[#090909] rounded-[10px]">
          <table className="w-full">
            <StakeGenerationTableHeader />
            {filterDelegations && filterDelegations.length > 0 && <StakeGenerationTableBody data={filterDelegations}/>}
          </table>
          {!filterDelegations || filterDelegations.length < 1 && (
            <div className="flex flex-col justify-center items-center gap-3 h-[136px]">
              <Avatar 
                className="w-[44px] h-[44px]"
                icon={<LogoIcon />}
              />
              <Typography variant="label-small" className="font-bold">No Generation</Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}