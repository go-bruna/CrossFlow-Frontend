import { useQuery } from "@tanstack/react-query";
import { GET_ACCOUNT_SUMMARY } from "@/constants/query";
import { getAccountSummary } from "@/apis/account";

export const useAccountSummary = (address?: string) => {
	const { data, isLoading } = useQuery({
		queryKey: [GET_ACCOUNT_SUMMARY],
		queryFn: async () => {
			return await getAccountSummary(address);
		},
		enabled: !!address
	});
	return { data, isLoading };
};
