import { ChangeEvent, useEffect, useMemo, useState } from "react";
import Header from "@/components/layout/base/header/index"
import Card from "@/components/card"
import { MAIN_POOLS_ITEM_DATA } from "@/constants"
import Tab from "@/components/tab";
import { Input } from "@/components/input";
import { SearchIcon } from "@/assets/icons/common";
import Table from "@/components/table";
import { ITag } from "@/types/interfaces";
import { EthereumIcon } from "@/assets/icons/coins";
import { usePoolSummary } from "@/hooks/queries/usePoolSummary";
import { GET_POOL_LIST, GET_POOL_SUMMARY } from "@/constants/query";
import { queryClient } from "@/wagmi";
import { numberFormat } from "@/utils";
import { usePoolList } from "@/hooks/queries/usePoolList";
import { IPool } from "@/types/api/pool";

const tabs = [{
  title: 'All',
}, {
  title: 'Ethereum',
  icon: <EthereumIcon />
}]

export const MainPoolPage = () => {
  const { data: poolSummary } = usePoolSummary()
  const { data: poolList } = usePoolList()
  const [currentTag, setCurrentTag] = useState<ITag>(tabs[0]);
  const [ search, setSearch] = useState<string | undefined>(undefined)

  const invalidateQuery = async () => {
    Promise.all([
      queryClient.invalidateQueries({ queryKey: [GET_POOL_SUMMARY] }),
      queryClient.invalidateQueries({ queryKey: [GET_POOL_LIST] }),
      // queryClient.invalidateQueries({
      //   queryKey: [GET_ACCOUNT_BORROWED],
      // }),
    ])
  }
  
  const _summary = useMemo(() => {
    return !poolSummary
      ? ['0%', '$0', '$0', '$0', '$0']
      : [
        '$' + numberFormat(poolSummary.total_borrow),
        '$' + numberFormat(poolSummary.total_borrow),
        '$' + numberFormat(poolSummary.available_liquidity),
        '$' + numberFormat(poolSummary.daily_cfn_rewards),
        '$' + numberFormat(poolSummary.assets),
      ]
  }, [poolSummary])

  const filterPools = useMemo(() => {
    if (!poolList) return undefined
    if (currentTag.title === 'All') return poolList
    return poolList
      .filter((pool: IPool) => pool.chain_symbol.toLowerCase() === currentTag.title.toLowerCase())
  }, [poolList, currentTag])

  useEffect(() => {
    invalidateQuery()
  }, [])

  return (
    <div className="w-full animate-fade-in-up">
      <Header.Desktop title={'Main Pools'} />
      
      {/* container */}
      <div className="mt-[30px]">
        <Card.MainStatsBar 
          labels={MAIN_POOLS_ITEM_DATA}
          values={_summary}
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
        { filterPools && <Table.MainPools data={filterPools}/> }
      </div>
    </div>
  )
}