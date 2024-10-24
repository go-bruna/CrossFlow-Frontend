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

	return { data, isLoading };
};
