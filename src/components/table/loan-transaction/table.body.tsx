import { Typography } from "@/components/typography";
import { HOLESKY_BASE_TRANSACTION_URL, MEMPOOL_BASE_TRANSACTION_URL } from "@/constants";
// import { MEMPOOL_BASE_TRANSACTION_URL } from "@/constants";
import { IAssetBorrowedTransaction } from "@/types/api/pool";
import { fromWei, getFixedNumber, numberFormat, truncateAddress } from "@/utils";

interface Props {
  transactions: IAssetBorrowedTransaction[]
}
interface IRowProps {
  data: IAssetBorrowedTransaction
}

const Row = ({ data }: IRowProps) => {
  
  const refineAmount = (amount: string) => {
    return data.collateral_symbol === 'USDT' 
        ? numberFormat(fromWei(amount)) 
        : data.collateral_symbol === 'BTC'
          ? Number(amount) / 1e8
          : amount
  }

  return (
    <tr className="h-[48px] text-[13px] hover:bg-[#1b1b1b] text-white">
      <td className="pl-5">{data.id}</td>
      <td>
        <div className="flex gap-1 items-center">
          <Typography variant="label-small">{ refineAmount(data.collateral_amount) }</Typography>
          <Typography variant="label-extrasmall" className="text-[#fff]/50">{ data.collateral_symbol }</Typography>
        </div>
      </td>
      <td>
        {!!data.release_hash && (
          <a
            className="underline text-white"
            href={`
              ${data.collateral_symbol === 'USDT' 
                ? MEMPOOL_BASE_TRANSACTION_URL 
                : HOLESKY_BASE_TRANSACTION_URL
              }/${data.release_hash}`
            }
            target="_blank"
            rel="noreferrer"
          >
            {truncateAddress(data.release_hash, 6)}
          </a>
        )}
      </td>
      <td>{`${getFixedNumber(Number(data.loan_rate) * 100)} %`}</td>
      <td className="capitalize">{data.status}</td>
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