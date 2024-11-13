import { useQuery } from "@tanstack/react-query";
import { GET_ASSET_PRICE } from "@/constants/query";
import { getAssetPrice } from "@/apis/pool";

export const useAssetPrice = (ticker?: string) => {
	const { data, isLoading } = useQuery({
		queryKey: [GET_ASSET_PRICE],
		queryFn: async () => {
			return await getAssetPrice(ticker ?? `BTC`);
		},
	});

	return { data, isLoading };
};
