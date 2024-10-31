import { useQuery } from "@tanstack/react-query";
import { GET_MAX_INTEREST_RATE } from "@/constants/query";
import { getMaxInterestRate } from "@/apis/pool";

export const useMaxInterestRate = () => {
	const { data, isLoading } = useQuery({
		queryKey: [GET_MAX_INTEREST_RATE],
		queryFn: async () => {
			return await getMaxInterestRate();
		},
	});

	return { data, isLoading };
};
