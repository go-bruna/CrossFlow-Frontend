import { useQuery } from "@tanstack/react-query";
import { GET_ACCOUNT_BORROWED } from "@/constants/query";
import { getAccountBorrowedAssets } from "@/apis/account";

export const useAccountBorrowed = (address?: string) => {
	const { data, isLoading } = useQuery({
		queryKey: [GET_ACCOUNT_BORROWED],
		queryFn: async () => {
			return await getAccountBorrowedAssets(address);
		},
		enabled: !!address
	});

	if (!data)
		return {
			data: null,
			isLoading
		}
		
	return { data, isLoading };
};
