import { useQuery } from "@tanstack/react-query";
import { GET_STAKE_ALL_VALIDATORS } from "@/constants/query";
import { getAllValidators } from "@/apis/staking";

export const useStakeValidators = () => {
	const { data, isLoading } = useQuery({
		queryKey: [GET_STAKE_ALL_VALIDATORS],
		queryFn: async () => {
			return await getAllValidators();
		},
	});

	if (!data)
		return {
			data: null,
			isLoading
		}
		
	return { data, isLoading };
};
