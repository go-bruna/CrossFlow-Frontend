import { MEMPOOL_BASE_TRANSACTION_URL } from "@/constants";
import { IAssetSuppliedTransaction } from "@/types/api/pool";
import { getFixedNumber, truncateAddress } from "@/utils";
import BigNumber from "bignumber.js";

interface Props {
	transactions: IAssetSuppliedTransaction[];
}
interface IRowProps {
	data: IAssetSuppliedTransaction;
}

const Row = ({ data }: IRowProps) => {
	return (
		<tr className="h-[48px] text-[13px] hover:bg-[#1b1b1b] text-white">
			<td className="pl-5">{data.id}</td>
			<td>{BigNumber(data.amount).dividedBy(1e8).toNumber()}</td>
			<td>
				{!!data.tss_hash && (
					<a
						className="underline text-white"
						href={`${MEMPOOL_BASE_TRANSACTION_URL}/${data.tss_hash}`}
						target="_blank"
						rel="noreferrer"
					>
						{truncateAddress(data.tss_hash, 6)}
					</a>
				)}
			</td>
			<td>{`${getFixedNumber(Number(data.interest_rate) * 100)} %`}</td>
			<td className="capitalize">{data.status}</td>
		</tr>
	);
};

export const SupplyTableBody = ({ transactions }: Props) => {
	return (
		<tbody className="overflow-y-auto">
			{transactions.map((item: IAssetSuppliedTransaction, index: number) => (
				<Row data={item as IAssetSuppliedTransaction} key={index} />
			))}
		</tbody>
	);
};
