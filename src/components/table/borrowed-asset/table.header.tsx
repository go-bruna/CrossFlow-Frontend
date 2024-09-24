import { InforCircleIcon } from "@/assets/icons/infor"
import { SortIcon } from "@/assets/icons/sort"
import { Avatar } from "@/components/avatar"

export const BorrowedAssetsTableHeader = () => {
  return (
    <thead className="text-[11px] text-white sticky top-0 bg-[#101010]">
      <tr className="text-left font-bold h-10">
        <th className="w-[12%] pl-5 rounded-tl-[10px]">Asset</th>
        <th className="w-[14%]">
          <div className="flex items-center justify-end">
            APY / LTV
            <Avatar icon={<SortIcon />} />
          </div>
        </th>
        <th className="w-[14%]">
          <div className="flex items-center justify-end">
            Balance
            <Avatar icon={<InforCircleIcon />} />
            <Avatar icon={<SortIcon />} />
          </div>
        </th>
        <th className="w-[15%]">
          <div className="flex items-center justify-end">
           % of limit
            <Avatar icon={<SortIcon />} />
          </div>
        </th>
        <th className="w-[15%]" />
        <th className="w-[14%]" />
        <th className="w-[14%] rounded-tr-[10px]" />
      </tr>
    </thead>
  )
}