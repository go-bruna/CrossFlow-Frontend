import { useQuery } from "@tanstack/react-query";
import { GET_STAKE_ALL_DELEGATIONS } from "@/constants/query";
import { getAllDelegations } from "@/apis/staking";

export const useStakeDelegations = (address?: string) => {
	const { data, isLoading } = useQuery({
		queryKey: [GET_STAKE_ALL_DELEGATIONS],
		queryFn: async () => {
			return await getAllDelegations(address);
		},
    enabled: !!address
	});
	return { data, isLoading };
};
