import { useQuery } from "@tanstack/react-query";
import { GET_GOVERNANCE_VOTES } from "@/constants/query";
import { getGovernanceProposalVotes } from "@/apis/governance";

export const useGovernanceVotes = (proposal_id?: string) => {
	const { data, isLoading } = useQuery({
		queryKey: [GET_GOVERNANCE_VOTES],
		queryFn: async () => {
			return await getGovernanceProposalVotes(proposal_id);
		},
    enabled: !!proposal_id
	});
	return { data, isLoading };
};
