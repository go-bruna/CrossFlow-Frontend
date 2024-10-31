export const LockTableHeader = () => {
  return (
    <thead className="text-white text-[11px] sticky top-0">
      <tr className="text-left font-bold h-[60px]">
        <th className="w-[15%] pl-5">Id</th>
        <th className="w-[23%]">Amount</th>
        <th className="w-[37%]">Lock Address</th>
        <th className="w-[25%]">Status</th>
      </tr>
    </thead>
  )
}