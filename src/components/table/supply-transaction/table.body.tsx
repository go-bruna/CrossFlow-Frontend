import { IAssetSuppliedTransaction } from "@/types/api/pool";
import { getFixedNumber } from "@/utils";

interface Props {
  transactions: IAssetSuppliedTransaction[]
}
interface IRowProps {
  data: IAssetSuppliedTransaction
}

const Row = ({ data }: IRowProps) => {
  return (
    <tr className="h-[48px] text-[13px] hover:bg-[#1b1b1b] text-white">
      <td className="pl-5">{data.id}</td>
      <td>{Number(data.amount) / 1e8}</td>
      <td>{`${getFixedNumber(Number(data.interest_rate) * 100)} %`}</td>
      <td>{data.status}</td>
    </tr>
  )
}

export const SupplyTableBody = ({ transactions }: Props) => {
  return (
    <tbody className="overflow-y-auto">
    {transactions.map((item: IAssetSuppliedTransaction, index: number) => (
      <Row 
        data={item as IAssetSuppliedTransaction} 
        key={index} 
      />
    ))}
    </tbody>
  )
}