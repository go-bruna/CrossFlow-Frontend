import { useQuery } from "@tanstack/react-query";
import { GET_STAKE_SUMMARY } from "@/constants/query";
import { getStakeSummary } from "@/apis/staking";

export const useStakeSummary = (address?: string) => {
	const { data, isLoading } = useQuery({
		queryKey: [GET_STAKE_SUMMARY],
		queryFn: async () => {
			return await getStakeSummary(address);
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
