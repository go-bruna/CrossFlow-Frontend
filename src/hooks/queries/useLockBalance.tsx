import { useQuery } from "@tanstack/react-query";
import { GET_POOL_LOCK_BALANCE } from "@/constants/query";
import { getLockBalance } from "@/apis/pool";

export const useLockBalance = () => {
	const { data, isLoading } = useQuery({
		queryKey: [GET_POOL_LOCK_BALANCE],
		queryFn: async () => {
			return await getLockBalance();
		},
	});

	if (!data)
		return {
			data: null,
			isLoading
		}
	return { data, isLoading };
};
