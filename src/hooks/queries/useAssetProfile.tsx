import { useQuery } from "@tanstack/react-query";
import { GET_ASSET_PROFILE } from "@/constants/query";
import { getAssetProfiles } from "@/apis/pool";

export const useAssetProfile = () => {
	const { data, isLoading } = useQuery({
		queryKey: [GET_ASSET_PROFILE],
		queryFn: async () => {
			return await getAssetProfiles();
		},
	});

	if (!data)
		return {
			data: null,
			isLoading
		}
		
	return { data, isLoading };
};
