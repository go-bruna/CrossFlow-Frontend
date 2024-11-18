import { useQuery } from "@tanstack/react-query";
import { GET_ACCOUNT_SUPPLIES } from "@/constants/query";
import { getAccountSuppliesAssets } from "@/apis/account";

export const useAccountSupplies = (address?: string) => {
	const { data, isLoading } = useQuery({
		queryKey: [GET_ACCOUNT_SUPPLIES],
		queryFn: async () => {
			return await getAccountSuppliesAssets(address);
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
