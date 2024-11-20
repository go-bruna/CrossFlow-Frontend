import { MEMPOOL_BASE_TRANSACTION_URL } from "@/constants";
import { IRepayTransaction } from "@/types/api/pool";
import { pureNumberFormat, truncateAddress } from "@/utils";

interface Props {
  transactions: IRepayTransaction[]
}
interface IRowProps {
  data: IRepayTransaction
}

const Row = ({ data }: IRowProps) => {

  return (
    <tr className="h-[48px] text-[13px] hover:bg-[#1b1b1b] text-white">
      <td className="pl-5">{data.id}</td>
      <td>
        {data.repay_origin_chain === 'BTC' 
          ? pureNumberFormat(Number(data.amount_repay)/1e8, 4) 
          : pureNumberFormat(Number(data.amount_repay)/1e18, 2)
        }
      </td>
      <td>
        {!!data.origin_hash && (
          <a
            className="underline text-white"
            href={`${MEMPOOL_BASE_TRANSACTION_URL}/${data.origin_hash}`}
            target="_blank"
            rel="noreferrer"
          >
            {truncateAddress(data.origin_hash, 6)}
          </a>
        )}
      </td>
      <td>
        {!!data.target_hash && (
          <a
            className="underline text-white"
            href={`${MEMPOOL_BASE_TRANSACTION_URL}/${data.target_hash}`}
            target="_blank"
            rel="noreferrer"
          >
            {truncateAddress(data.target_hash, 6)}
          </a>
        )}
      </td>
      <td className="capitalize">{data.status}</td>
    </tr>
  )
}

export const RepayTableBody = ({ transactions }: Props) => {
  return (
    <tbody className="overflow-y-auto">
    {transactions.map((item: IRepayTransaction, index: number) => (
      <Row 
        data={item as IRepayTransaction} 
        key={index} 
      />
    ))}
    </tbody>
  )
}