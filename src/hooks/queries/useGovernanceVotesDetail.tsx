import { useQuery } from "@tanstack/react-query";
import { GET_GOVERNANCE_VOTE_DETAIL } from "@/constants/query";
import { getGovernanceProposalVoteDetail } from "@/apis/governance";

export const useGovernanceVoteDetail = (proposal_id?: string, vote_id?: string) => {
	const { data, isLoading } = useQuery({
		queryKey: [GET_GOVERNANCE_VOTE_DETAIL],
		queryFn: async () => {
			return await getGovernanceProposalVoteDetail(proposal_id, vote_id);
		},
    enabled: !!proposal_id && !!vote_id
	});
	return { data, isLoading };
};
