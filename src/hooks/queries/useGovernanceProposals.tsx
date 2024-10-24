import { useQuery } from "@tanstack/react-query";
import { GET_GOVERNANCE_PROPOSALS } from "@/constants/query";
import { getGovernanceProposals } from "@/apis/governance";

export const useGovernanceProposals = () => {
	const { data, isLoading } = useQuery({
		queryKey: [GET_GOVERNANCE_PROPOSALS],
		queryFn: async () => {
			return await getGovernanceProposals();
		},
	});
	return { data, isLoading };
};
