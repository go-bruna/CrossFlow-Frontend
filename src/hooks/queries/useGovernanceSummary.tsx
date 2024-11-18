import { useQuery } from "@tanstack/react-query";
import { GET_GOVERNANCE_SUMMARY } from "@/constants/query";
import { getGovernanceSummary } from "@/apis/governance";

export const useGovernanceSummary = () => {
	const { data, isLoading } = useQuery({
		queryKey: [GET_GOVERNANCE_SUMMARY],
		queryFn: async () => {
			return await getGovernanceSummary();
		},
	});

	if (!data)
		return {
			data: null,
			isLoading
		}
		
	return { data, isLoading };
};
