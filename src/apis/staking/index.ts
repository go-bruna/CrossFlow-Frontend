import { BaseResponse } from "@/types/api/base";
import axios from "axios";

export const getOrbkUsdtPrice = async (): Promise<any> => {
	try {
		const { data } = await axios.get(
			`https://ordibank.duckdns.org/get_orbk_price`,
			// `http://144.76.71.216:5000/get_orbk_price`,
			{
				withCredentials: false,
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "multipart/form-data",
				},
			},
		);
		return data;
	} catch (error) {
		return error as Promise<BaseResponse<any>>;
	}
};
