import { MEMPOOL_BASE_TRANSACTION_URL } from "@/constants";
import { IBaseLockTransaction } from "@/types/api/pool";
import { truncateAddress } from "@/utils";

interface Props {
  transactions: IBaseLockTransaction[]
}
interface IRowProps {
  data: IBaseLockTransaction
}

const Row = ({ data }: IRowProps) => {
  return (
    <tr className="h-[48px] text-[13px] hover:bg-[#1b1b1b] text-white">
      <td className="pl-5">{data.id}</td>
      <td>{Number(data.amount) / 1e8}</td>
      <td>{truncateAddress(data.lock_address, 6)}</td>
      <td>
        <a
          className="underline text-white"
          href={`${MEMPOOL_BASE_TRANSACTION_URL}/${data.tx_hash}`}
          target="_blank"
          rel="noreferrer"
        >
          {truncateAddress(data.tx_hash, 6)}
        </a>
      </td>
      <td>{data.status}</td>
    </tr>
  )
}

export const LockTableBody = ({ transactions }: Props) => {
  return (
    <tbody className="overflow-y-auto">
    {transactions.map((item: IBaseLockTransaction, index: number) => (
      <Row 
        data={item as IBaseLockTransaction} 
        key={index} 
      />
    ))}
    </tbody>
  )
}