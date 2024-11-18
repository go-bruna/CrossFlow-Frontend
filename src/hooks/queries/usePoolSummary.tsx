import { useQuery } from "@tanstack/react-query";
import { GET_POOL_SUMMARY } from "@/constants/query";
import { getPoolSummary } from "@/apis/pool";

export const usePoolSummary = () => {
	const { data, isLoading } = useQuery({
		queryKey: [GET_POOL_SUMMARY],
		queryFn: async () => {
			return await getPoolSummary();
		},
	});

	if (!data)
		return {
			data: null,
			isLoading
		}
		
	return { data, isLoading };
};
