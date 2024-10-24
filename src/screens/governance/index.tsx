import { SearchIcon } from "@/assets/icons/common"
import Card from "@/components/card"
import Header from "@/components/layout/base/header"
import { Input } from "@/components/input"
import Tab from "@/components/tab"
import { GOVERNANCE_ITEM_DATA } from "@/constants"
import { ChangeEvent, useEffect, useState } from "react"
import { ITag } from "@/types/interfaces"
import Table from "@/components/table"
import { useGovernanceSummary } from "@/hooks/queries/useGovernanceSummary"
import { queryClient } from "@/wagmi"
import { GET_GOVERNANCE_PROPOSALS, GET_GOVERNANCE_SUMMARY } from "@/constants/query"
import { numberFormat } from "@/utils"
import GovernanceSkeleton from "./skeleton"


const GOVERNANCE_STATUS_TABS = [{
  title: 'All',
 }, {
  title: 'Ongoing',
  icon: <div className="w-2 h-2 rounded-full bg-[#f6851b]"/>
 }, {
  title: 'Executed',
  icon: <div className="w-2 h-2 rounded-full bg-[#36f5cf]"/>
 }, {
  title: 'Rejected',
  icon: <div className="w-2 h-2 rounded-full bg-[#e62d0f]"/>
 }
]

export const GovernancePage = () => {
  const { data: governamceSummary, isLoading: loadingSummary } = useGovernanceSummary() 
  const [currentTag, setCurrentTag] = useState<ITag>(GOVERNANCE_STATUS_TABS[0]);
  const [ search, setSearch] = useState<string | undefined>(undefined)

  // invalidate queries
  const invalidateQuery = async () => {
    Promise.all([
      queryClient.invalidateQueries({ queryKey: [GET_GOVERNANCE_SUMMARY] }),
      queryClient.invalidateQueries({ queryKey: [GET_GOVERNANCE_PROPOSALS] }),
    ])
  }

  useEffect(() => {
    invalidateQuery()
  }, [])
  
  if (loadingSummary) {
    return <GovernanceSkeleton />
  }

  return (
    <div className="w-full animate-fade-in-up">
      <Header.Desktop title={'Governance'} />

      {/* Container */}
      <div className="mt-[30px]">
        <Card.GovernanceStatsBar 
          labels={GOVERNANCE_ITEM_DATA}
          values={[
            numberFormat(governamceSummary?.total_proposals), 
            `$${numberFormat(governamceSummary?.total_staked)}`
          ]}
        />

        {/* Category and Search */}
        <div className="flex justify-between items-center mt-5">
          {/* Categories */}
          <Tab.List
            tabs={GOVERNANCE_STATUS_TABS}
            selected={currentTag}
            onSelect={(_current: ITag) => setCurrentTag(_current)}
            classOverride={{
              container: 'w-auto rounded-full',
              tabButton: 'text-sm px-[22px]'
            }}
          />
          {/* Search */}
          <Input 
            icon={<SearchIcon />}
            value={search || ''}
            placeholder="Search"
            classOverride={{
              inputContainer: 'w-[252px] py-2',
              value: 'text-[13px] text-[#5e7e8e]'
            }}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
        </div>
       
        <Table.Governance search={search} filter={currentTag}/>
      </div>
    </div>
  )
}
