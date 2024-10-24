import { useQuery } from "@tanstack/react-query";
import { GET_GOVERNANCE_PROPOSAL_DETAIL } from "@/constants/query";
import { getGovernanceProposalDetail } from "@/apis/governance";

export const useGovernanceProposalDetail = (id?: string) => {
	const { data, isLoading } = useQuery({
		queryKey: [GET_GOVERNANCE_PROPOSAL_DETAIL],
		queryFn: async () => {
			return await getGovernanceProposalDetail(id);
		},
	});
	return { data, isLoading };
};
