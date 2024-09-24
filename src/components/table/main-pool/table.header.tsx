import { InforCircleIcon } from "@/assets/icons/infor"
import { SortIcon } from "@/assets/icons/sort"
import { Avatar } from "@/components/avatar"

export const MainPoolsTableHeader = () => {
  return (
    <thead className="text-[11px] text-white sticky top-0 bg-[#101010]">
      <tr className="text-left crossflow-bold h-[60px]">
        <th className="w-[12%] pl-5 rounded-tl-[10px]">Asset</th>
        <th className="w-[14%]">
          <div className="flex items-center justify-end">
            Total supply
            <Avatar icon={<SortIcon />} />
          </div>
        </th>
        <th className="w-[15%]">
          <div className="flex items-center justify-end">
            Supply APY
            <Avatar icon={<InforCircleIcon />} />
            <Avatar icon={<SortIcon />} />
          </div>
        </th>
        <th className="w-[14%]">
          <div className="flex items-center justify-end">
            Total borrow
            <Avatar icon={<SortIcon />} />
          </div>
        </th>
        <th className="w-[15%]">
          <div className="flex items-center justify-end">
            Borrow APY
            <Avatar icon={<InforCircleIcon />} />
            <Avatar icon={<SortIcon />} />
          </div>
        </th>
        <th className="w-[14%]">
          <div className="flex items-center justify-end">
            Liquidity
            <Avatar icon={<SortIcon />} />
          </div>
        </th>
        <th className="w-[14%] pr-5 rounded-tr-[10px]">
          <div className="flex items-center justify-end">
            Price
            <Avatar icon={<SortIcon />} />
          </div>
        </th>
      </tr>
    </thead>
  )
}