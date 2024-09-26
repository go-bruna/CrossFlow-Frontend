import { SearchIcon } from "@/assets/icons/common"
import { InforCircleIcon } from "@/assets/icons/infor"
import Card from "@/components/card"
import Header from "@/components/layout/base/header"
import { Divider } from "@/components/divider"
import { Input } from "@/components/input"
import { CustomProgress } from "@/components/progress"
import Tab from "@/components/tab"
import { ACCOUNT_ITEM_DATA } from "@/constants"
import { ChangeEvent, useState } from "react"
import { BaseItem } from "@/components/card/base/item.base"
import Table from "@/components/table"
import { ITag } from "@/types/interfaces"
import { BorrowedAssetIcon, SuppliedAssetIcon } from "@/assets/icons/supplies"

const tabs = [
  { title: 'All' },
  { title: 'Supplied assets', icon: <SuppliedAssetIcon /> },
  { title: 'Borrowed assets', icon: <BorrowedAssetIcon /> }
]

export const AccountPage = () => {
  const [currentTag, setCurrentTag] = useState<ITag>(tabs[0]);
  const [ search, setSearch] = useState<string | undefined>(undefined)

  return (
    <div className="w-full">
      <Header.Desktop title={'Account'} />

      {/* Container */}
      <div className="mt-[30px]">
        <Card.AccountStatsBar 
          labels={ACCOUNT_ITEM_DATA}
          labelIcons={[<InforCircleIcon />]}
          valueColor="text-[#36f5cf]"
          values={['4.23%', '<$24.12', '$2.12K', '$2.12K', '$0']}
        />

        {/* Borrow limit by progress */}
        <CustomProgress 
          headerLabels={['Borrow limit used:', 'Limit:']}
          headerValues={['80%', '$11.23']}
          current="80"
          limit="80"
          footerLabel="Your safe limit"
          footerValue="$8.85"
          classOverride={{
            container: 'w-[420px] mt-7 mb-3'
          }}
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
        <Divider className="bg-[#5e7e8e]/20 my-5"/>

        {/* Supplied Assets Table */}
        <BaseItem
          title="Supplied assets"
          classOverride={{
            container: "gap-[6px]",
            title: "text-base font-medium",
            textGap: "flex-row items-center",
          }}
        />
        <Table.SuppliedAssets />

        {/* Borrowed Assets Table */}
        <BaseItem
          title="Borrowed assets"
          classOverride={{
            container: "gap-[6px]",
            title: "text-base font-medium",
            textGap: "flex-row items-center",
          }}
        />
        <Table.BorrowedAssets />

      </div>
    </div>
  )
}