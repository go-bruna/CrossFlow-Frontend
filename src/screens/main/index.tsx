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
import MainPoolSkeleton from "./skeleton";

const tabs = [{
  title: 'All',
  value: 'All'
}, {
  title: 'Ethereum',
  icon: <EthereumIcon />,
  value: 'ETH'
}]

export const MainPoolPage = () => {
  const { data: poolSummary, isLoading: loadingSummary } = usePoolSummary()
  const { data: poolList, isLoading: loadingPoolList } = usePoolList()
  const [ currentTag, setCurrentTag ] = useState<ITag>(tabs[0]);
  const [ search, setSearch ] = useState<string | undefined>(undefined)

  /**
   * Invalidate queries
   */
  const invalidateQuery = async () => {
    Promise.all([
      queryClient.invalidateQueries({ queryKey: [GET_POOL_SUMMARY] }),
      queryClient.invalidateQueries({ queryKey: [GET_POOL_LIST] }),
    ])
  }
  
  /**
   * Get values for main pool summary.
   */
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

  /**
   * Filter pools by tag and search key
   */
  const filterPools = useMemo(() => {
    if (!poolList) 
      return undefined

    // get pool list by selected tag
    const _pools_by_selected_tag = currentTag.title === 'All' 
      ? poolList
      : poolList
      .filter((pool: IPool) => pool.chain_symbol.toLowerCase() === (currentTag.value as string).toLowerCase())

    if (_pools_by_selected_tag.length < 1)
      return undefined

    // filter pool list by search key
    if (!!search) {
      return _pools_by_selected_tag.filter((e: IPool) =>
        e.asset_symbol.toLowerCase().includes(search.toLowerCase()) ||
        e.total_supply.toLowerCase().includes(search.toLowerCase()) ||
        e.apy.toLowerCase().includes(search.toLowerCase()) ||
        e.apy2.toLowerCase().includes(search.toLowerCase()) ||
        e.total_borrow.toLowerCase().includes(search.toLowerCase()) ||
        e.liquidity.toLowerCase().includes(search.toLowerCase()) ||
        e.price.toLowerCase().includes(search.toLowerCase())
      )
    }
    return _pools_by_selected_tag
  }, [poolList, currentTag, search])

  useEffect(() => {
    invalidateQuery()
  }, [])

  if (loadingSummary || loadingPoolList)
    return <MainPoolSkeleton />

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