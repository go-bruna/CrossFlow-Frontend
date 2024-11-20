export const LockTableHeader = () => {
  return (
    <thead className="text-white text-[11px] sticky top-0">
      <tr className="text-left font-bold h-[60px]">
        <th className="w-[12%] pl-5">Id</th>
        <th className="w-[15%]">Amount</th>
        <th className="w-[27%]">Lock Address</th>
        <th className="w-[27%]">Tx Hash</th>
        <th className="w-[20%]">Status</th>
      </tr>
    </thead>
  )
}