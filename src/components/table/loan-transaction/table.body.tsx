import { IAssetBorrowedTransaction } from "@/types/api/pool";
import { getFixedNumber, truncateAddress } from "@/utils";

interface Props {
  transactions: IAssetBorrowedTransaction[]
}
interface IRowProps {
  data: IAssetBorrowedTransaction
}

const Row = ({ data }: IRowProps) => {
  return (
    <tr className="h-[48px] text-[13px] hover:bg-[#1b1b1b] text-white">
      <td className="pl-5">{data.id}</td>
      <td>{Number(data.collateral_amount) / 1e8}</td>
      <td>{`${getFixedNumber(Number(data.loan_rate) * 100)} %`}</td>
      <td>{truncateAddress(data.loan_address, 5)}</td>
      <td>{data.status}</td>
    </tr>
  )
}

export const LoanTableBody = ({ transactions }: Props) => {
  return (
    <tbody className="overflow-y-auto">
    {transactions.map((item: IAssetBorrowedTransaction, index: number) => (
      <Row 
        data={item as IAssetBorrowedTransaction} 
        key={index} 
      />
    ))}
    </tbody>
  )
}