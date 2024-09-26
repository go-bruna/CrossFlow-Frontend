import { ChangeEvent, useState } from "react";
import Header from "@/components/layout/base/header/index"
import Card from "@/components/card"
import { MAIN_POOLS_ITEM_DATA } from "@/constants"
import Tab from "@/components/tab";
import { Input } from "@/components/input";
import { SearchIcon } from "@/assets/icons/common";
import Table from "@/components/table";
import { ITag } from "@/types/interfaces";
import { EthereumIcon } from "@/assets/icons/coins";

const tabs = [{
  title: 'All',
}, {
  title: 'Ethereum',
  icon: <EthereumIcon />
}]

export const MainPoolPage = () => {
  const [currentTag, setCurrentTag] = useState<ITag>(tabs[0]);
  const [ search, setSearch] = useState<string | undefined>(undefined)
  return (
    <div className="w-full">
      <Header.Desktop title={'Main Pools'} />
      
      {/* container */}
      <div className="mt-[30px]">
        <Card.MainStatsBar 
          labels={MAIN_POOLS_ITEM_DATA}
          values={['$2.12M', '$2.12M', '$3.12M', '12.312M', '8']}
        />

        {/* Category and Search */}
        <div className="flex justify-between items-center mt-5">
          {/* Categories */}
          <Tab.List
            tabs={tabs}
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

        {/* Table */}
        <Table.MainPools />
      </div>
    </div>
  )
}