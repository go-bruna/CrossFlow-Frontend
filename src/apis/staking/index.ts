import { BASE_URL } from "@/constants/endpoint"
import { IStakeSummary } from "@/types/api/stake"

import axios from "axios"

export const getStakeSummary = async (
	address?: string
): Promise<IStakeSummary | undefined> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/Crossflow-Network/CF-Protocol/chain/get_stake_summary/${address}`)
    return data?.stake_summary
  } catch (error: any) {
    console.log("===error====", error)
  }
}