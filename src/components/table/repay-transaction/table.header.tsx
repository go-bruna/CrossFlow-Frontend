export const RepayTableHeader = () => {
  return (
    <thead className="text-white text-[11px] sticky top-0">
      <tr className="text-left font-bold h-[60px]">
        <th className="w-[13%] pl-5">Id</th>
        <th className="w-[19%]">Amount</th>
        <th className="w-[30%]">Origin Hash</th>
        <th className="w-[20%]">Target Hash</th>
        <th className="w-[25%]">Status</th>
      </tr>
    </thead>
  )
}