import { useQuery } from "@tanstack/react-query";
import { GET_POOL_LIST } from "@/constants/query";
import { getPoolList } from "@/apis/pool";

export const usePoolList = () => {
	const { data, isLoading } = useQuery({
		queryKey: [GET_POOL_LIST],
		queryFn: async () => {
			return await getPoolList();
		},
	});

	if (!data)
		return {
			data: null,
			isLoading
		}
		
	return { data, isLoading };
};
