import { BASE_URL } from "@/constants/endpoint"
import { IPool, IPoolSummary } from "@/types/api/pool"
import axios from "axios"

export const getPoolSummary = async (): Promise<IPoolSummary | undefined> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/Crossflow-Network/CF-Protocol/loan/get_pool_summary`)
    return data?.pool_summary
  } catch (error: any) {
    console.log("===error====", error)
  }
}

export const getPoolList = async (): Promise<IPool[] | undefined> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/Crossflow-Network/CF-Protocol/loan/get_pool_list`)
    return data?.asset_pool
  } catch (error: any) {
    console.log("===error====", error)
  }
}