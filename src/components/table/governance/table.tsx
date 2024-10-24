import { ITag } from "@/types/interfaces"
import { GovernanceTableBody } from "./table.body"
import { GovernanceTableHeader } from "./table.header"
import { useWindowSize } from "@/hooks/useWindowSize"
import { useMemo } from "react"
import { Avatar } from "@/components/avatar"
import { InforCircleIcon } from "@/assets/icons/infor"
import { Typography } from "@/components/typography"
import { useGovernanceProposals } from "@/hooks/queries/useGovernanceProposals"
import { refineStatus } from "@/helper/status"
// import Card from "@/components/card"
// import { Avatar } from "@/components/avatar"
// import { StakeIcon } from "@/assets/icons/stake"
// const orderArr = ['Ascending', 'Decending']

type Props = {
  search: string | undefined
  filter: ITag
}

export const GovernanceTable = ({
  search,
  filter
}: Props) => {

  const { windowSize } = useWindowSize()
  const { data: proposals, isLoading: loadingProposals } = useGovernanceProposals()

  const filteredTblData = useMemo(() => {
    if (!proposals)
      return []
    const _filter_data = filter.title.toLowerCase() === 'all' 
      ? proposals
      : proposals.filter(t => refineStatus(t.status) === filter.title.toLowerCase())

    if (!search) return _filter_data
    return _filter_data.filter(
      t => t.title.toLowerCase().includes(search?.toLowerCase())
    )

  }, [search, filter, proposals])

  if (loadingProposals) {
    return <></>
  }

  return (
    <div className="flex flex-col gap-4 my-10 mb-[70px] lg:mt-[45px] w-full">

      {/* Table */}
      <div 
        className="overflow-auto"
        style={{
          maxWidth: `${windowSize.width - 40}px`,
        }}
      >
        <div className="rounded-[10px] bg-[#101010] min-w-[1080px]">
          <div className="pb-3 overflow-auto max-h-[770px]">
            <table className="w-full">
              <GovernanceTableHeader />
              {filteredTblData && filteredTblData.length > 0 && (
                <GovernanceTableBody data={filteredTblData}/>
              )}
            </table>
            {filteredTblData.length < 1 && (
              <div className="flex flex-col justify-center items-center gap-3 h-[136px]">
                <Avatar 
                  className="w-[44px] h-[44px]"
                  icon={<InforCircleIcon />}
                />
                <Typography variant="label-small" className="crossflow-semibold">No Data</Typography>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}