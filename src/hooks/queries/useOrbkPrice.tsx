import { useQuery } from "@tanstack/react-query";
import { GET_ORBK_USDT_TICKER } from "@/constants/query";
import { getOrbkUsdtPrice } from "@/apis/staking";

export const useOrdiPrices = () => {
	const { data, ...rest } = useQuery({
		queryKey: [GET_ORBK_USDT_TICKER],
		queryFn: async () => {
			return await getOrbkUsdtPrice();
		},
	});

	return { ...rest, price: data?.last_price ?? 0 };
};
