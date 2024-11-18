import { Typography } from "@/components/typography";
import { IUSDTSuppliedTransaction } from "@/types/api/pool";
import { getFixedNumber, numberFormat, pureNumberFormat } from "@/utils";

interface Props {
  transactions: IUSDTSuppliedTransaction[]
}
interface IRowProps {
  data: IUSDTSuppliedTransaction
}

const Row = ({ data }: IRowProps) => {
  return (
    <tr className="h-[48px] text-[13px] hover:bg-[#1b1b1b] text-white">
      <td className="pl-5">{data.id}</td>
      <td>
        <div className="flex gap-1 items-center">
          <Typography variant="label-small">{ pureNumberFormat(Number(data.amount) / 10**18) }</Typography>
          <Typography variant="label-extrasmall" className="text-[#fff]/50">{ data.asset_symbol }</Typography>
        </div>
      </td>
      <td>{`${getFixedNumber(Number(data.interest_rate) * 100)} %`}</td>
      <td>{data.status}</td>
    </tr>
  )
}

export const SupplyUSDTTableBody = ({ transactions }: Props) => {
  return (
    <tbody className="overflow-y-auto">
    {transactions.map((item: IUSDTSuppliedTransaction, index: number) => (
      <Row 
        data={item as IUSDTSuppliedTransaction} 
        key={index} 
      />
    ))}
    </tbody>
  )
}