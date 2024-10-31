import { useQuery } from "@tanstack/react-query";
import { GET_POOL_TSS_PUBLIC_KEY } from "@/constants/query";
import { getTssPublicKey } from "@/apis/pool";

export const useTssPublicKey = () => {
	const { data, isLoading } = useQuery({
		queryKey: [GET_POOL_TSS_PUBLIC_KEY],
		queryFn: async () => {
			return await getTssPublicKey();
		},
	});

	return { data, isLoading };
};
