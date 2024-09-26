import { ITag } from "@/types/interfaces"
import { GovernanceTableBody } from "./table.body"
import { GovernanceTableHeader } from "./table.header"
import { useWindowSize } from "@/hooks/useWindowSize"
import { useMemo } from "react"
import { GOVERNANCE_TABLE_DATA } from "@/constants/table"
import { Avatar } from "@/components/avatar"
import { InforCircleIcon } from "@/assets/icons/infor"
import { Typography } from "@/components/typography"
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

  const filteredTblData = useMemo(() => {
    let _filter_data = filter.title.toLowerCase() === 'all' 
      ? GOVERNANCE_TABLE_DATA
      : GOVERNANCE_TABLE_DATA.filter(t => t.status.toLowerCase() === filter.title.toLowerCase())

    if (!search) return _filter_data
    return _filter_data.filter(
      t => t.title.toLowerCase().includes(search?.toLowerCase())
    )

  }, [search, filter])

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