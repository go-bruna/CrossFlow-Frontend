import { SearchIcon } from "@/assets/icons/common"
import { InforCircleIcon } from "@/assets/icons/infor"
import Card from "@/components/card"
import Header from "@/components/layout/base/header"
import { Divider } from "@/components/divider"
import { Input } from "@/components/input"
import { CustomProgress } from "@/components/progress"
import Tab from "@/components/tab"
import { ACCOUNT_ITEM_DATA } from "@/constants"
import { ChangeEvent, useEffect, useMemo, useState } from "react"
import { BaseItem } from "@/components/card/base/item.base"
import Table from "@/components/table"
import { ITag } from "@/types/interfaces"
import { BorrowedAssetIcon, SuppliedAssetIcon } from "@/assets/icons/supplies"
import { queryClient } from "@/wagmi"
import { GET_ACCOUNT_BORROWED, GET_ACCOUNT_SUMMARY, GET_ACCOUNT_SUPPLIES } from "@/constants/query"
import { useAccountSummary } from "@/hooks/queries/useAccountSummary"
import { useAccountSupplies } from "@/hooks/queries/useAccountSupplies"
import { useAccountBorrowed } from "@/hooks/queries/useAccountBorrowed"
import { useAccount } from "graz"
import AccountSkeleton from "./skeleton"

const tabs = [
  { title: 'All' },
  { title: 'Supplied assets', icon: <SuppliedAssetIcon /> },
  { title: 'Borrowed assets', icon: <BorrowedAssetIcon /> }
]

export const AccountPage = () => {
  const { data: account, isConnected } = useAccount()
  const [currentTag, setCurrentTag] = useState<ITag>(tabs[0]);
  const [ search, setSearch] = useState<string | undefined>(undefined)
  
  const { data: accountSummary, isLoading: loadingSummary } = useAccountSummary(account?.bech32Address)  
  const { data: accountAssetSupplies, isLoading: loadingSupplies } = useAccountSupplies(account?.bech32Address)
  const { data: accountassetBorrowed, isLoading: loadingBorrowed } = useAccountBorrowed(account?.bech32Address)

  const invalidateQuery = async () => {
    Promise.all([
      queryClient.invalidateQueries({ queryKey: [GET_ACCOUNT_SUMMARY] }),
      queryClient.invalidateQueries({ queryKey: [GET_ACCOUNT_SUPPLIES] }),
      queryClient.invalidateQueries({
        queryKey: [GET_ACCOUNT_BORROWED],
      }),
    ])
  }

  const _summary = useMemo(() => {
    return !accountSummary
      ? ['0%', '$0', '$0', '$0', '$0']
      : [
        Number(accountSummary.net_apy).toLocaleString() + '%',
        '$' + Number(accountSummary.daily_earnings).toLocaleString(),
        '$' + Number(accountSummary.total_supply).toLocaleString(),
        '$' + Number(accountSummary.total_borrow).toLocaleString(),
        '$' + Number(accountSummary.total_staked).toLocaleString(),
      ]
  }, [accountSummary])

  useEffect(() => {
    console.log("==load page===")
    invalidateQuery()
  }, [isConnected])

  if (loadingSummary || loadingSupplies || loadingBorrowed) {
    return <AccountSkeleton />
  }

  return (
    <div className="w-full animate-fade-in-up">
      <Header.Desktop title={'Account'} />

      {/* Container */}
      <div className="mt-[30px]">
        <Card.AccountStatsBar 
          labels={ACCOUNT_ITEM_DATA}
          labelIcons={[<InforCircleIcon />]}
          values={_summary}
        />

        {/* Borrow limit by progress */}
        <CustomProgress 
          headerLabels={['Borrow limit used:', 'Limit:']}
          headerValues={[
            `${Number(Number(accountSummary?.borrow_limit_used ?? 0).toFixed(2))}%`,
            '$11.23'
          ]}
          current={Number(accountSummary?.borrow_limit_used ?? 0).toString()}
          limit="80"
          footerLabel="Your safe limit"
          footerValue={`$${Number(accountSummary?.borrow_limit_used ?? 0).toLocaleString()}`}
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
        {currentTag.title === tabs[1].title ? (
          <>
            <BaseItem
              title="Supplied assets"
              classOverride={{
                container: "gap-[6px]",
                title: "text-base font-medium",
                textGap: "flex-row items-center",
              }}
            />
            {accountAssetSupplies && <Table.SuppliedAssets data={accountAssetSupplies}/>}
          </>
        ) : currentTag.title === tabs[2].title  ? (
          <>
            {/* Borrowed Assets Table */}
            <BaseItem
              title="Borrowed assets"
              classOverride={{
                container: "gap-[6px]",
                title: "text-base font-medium",
                textGap: "flex-row items-center",
              }}
            />
            {accountassetBorrowed && <Table.BorrowedAssets data={accountassetBorrowed}/>}
          </>
        ) : (
          <>
            <BaseItem
              title="Supplied assets"
              classOverride={{
                container: "gap-[6px]",
                title: "text-base font-medium",
                textGap: "flex-row items-center",
              }}
            />
            {accountAssetSupplies && <Table.SuppliedAssets data={accountAssetSupplies}/>}
            {/* Borrowed Assets Table */}
            <BaseItem
              title="Borrowed assets"
              classOverride={{
                container: "gap-[6px]",
                title: "text-base font-medium",
                textGap: "flex-row items-center",
              }}
            />
            {accountassetBorrowed && <Table.BorrowedAssets data={accountassetBorrowed}/>}
          </>
        ) }

      </div>
    </div>
  )
}