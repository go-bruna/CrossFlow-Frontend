export const StakeValidatorTableHeader = () => {
  return (
    <thead className="text-white text-[11px] sticky top-0">
      <tr className="text-left font-bold h-[60px]">
        <th className="w-[5%] pl-5">No</th>
        <th className="w-[10%]">Address</th>
        <th className="w-[10%]">Amount</th>
        <th className="w-[13%]">Status</th>
        <th className="w-[12%]">Unbonding Height</th>
        <th className="w-[14%]">Unbonding Time</th>
        <th className="w-[12%]">Commission</th>
        <th className="w-[12%]">Actions</th>
      </tr>
    </thead>
  )
}