import { InforCircleIcon } from "@/assets/icons/infor"
import { SortIcon } from "@/assets/icons/sort"
import { Avatar } from "@/components/avatar"

export const GovernanceTableHeader = () => {
  return (
    <thead className="text-[11px] text-white sticky top-0 bg-[#101010]">
      <tr className="text-left crossflow-bold h-[60px]">
        <th className="w-[12%] pl-5 rounded-tl-[10px]">
          <div className="flex items-center ">
            Proposal
            <Avatar icon={<SortIcon />} />
          </div>
        </th>
        <th className="">
          <div className="flex items-center ">
            Title
            <Avatar icon={<SortIcon />} />
          </div>
        </th>
        <th className="w-[13%]">
          <div className="flex items-center ">
            Status
            <Avatar icon={<InforCircleIcon />} />
            <Avatar icon={<SortIcon />} />
          </div>
        </th>
        <th className="w-[16%]">
          <div className="flex items-center ">
            Submit Time (UTC)
            <Avatar icon={<SortIcon />} />
          </div>
        </th>
        <th className="w-[18%]">
          <div className="flex items-center ">
            Voting Start Time (UTC)
            <Avatar icon={<InforCircleIcon />} />
            <Avatar icon={<SortIcon />} />
          </div>
        </th>
        <th className="w-[14%]">
          <div className="flex items-center ">
          Total Deposit
            <Avatar icon={<SortIcon />} />
          </div>
        </th>
      </tr>
    </thead>
  )
}