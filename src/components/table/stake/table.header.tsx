export const StakeTableHeader = () => {
  return (
    <thead className="text-gray-800 text-[11px] sticky top-0 bg-white">
      <tr className="text-left font-bold h-[60px]">
        <th className="w-[16%] pl-5">Amount</th>
        <th className="w-[14%]">Voting Power</th>
        <th className="w-[14%]">Lock time</th>
        <th className="w-[15%]">Unlock time</th>
        <th className="w-[14%]">Burn</th>
        <th className="w-[15%]">Claimable Rewards</th>
        <th className="w-[13%]"></th>
      </tr>
    </thead>
  )
}