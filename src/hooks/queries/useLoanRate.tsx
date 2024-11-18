import { useQuery } from "@tanstack/react-query";
import { GET_LOAN_RATE } from "@/constants/query";
import { getLoanRate } from "@/apis/pool";

export const useLoanRate = () => {
	const { data, isLoading } = useQuery({
		queryKey: [GET_LOAN_RATE],
		queryFn: async () => {
			return await getLoanRate();
		},
	});

	if (!data)
		return {
			data: null,
			isLoading
		}
		
	return { data, isLoading };
};
