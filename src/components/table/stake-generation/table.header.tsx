export const StakeGenerationTableHeader = () => {
  return (
    <thead className="text-white text-[11px] sticky top-0">
      <tr className="text-left font-bold h-[60px]">
        <th className="w-[10%] pl-5">No</th>
        <th className="w-[20%]">Validator Address</th>
        <th className="w-[15%]">Shares</th>
        <th className="w-[15%]">Asset</th>
        <th className="w-[15%]">Amount</th>
        <th className="w-[12%]">Actions</th>
      </tr>
    </thead>
  )
}