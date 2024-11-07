import { BASE_URL } from "@/constants/endpoint"
import { ErrorResponse } from "@/types/api/base"
import { IStakeDelegation, IStakeSummary, IValidator } from "@/types/api/stake"

import axios from "axios"

export const getStakeSummary = async (
	address?: string
): Promise<IStakeSummary | undefined> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/Crossflow-Network/CF-Protocol/chain/get_stake_summary/${address}`)
    return data?.stake_summary
  } catch (error: any) {
    console.log("===getStakeSummary error====", (error as unknown as ErrorResponse).message)
  }
}

/**
 * Fetch all validators in stake page
 * @returns IValidator[]
 */

export const getAllValidators = async (): Promise<IValidator[] | undefined> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/cosmos/staking/v1beta1/validators`)
    if (!data || !data.validators || !Array.isArray(data.validators))
      return undefined
    return data.validators
  } catch (error: any) {
    console.log("===getAllValidators error====", (error as unknown as ErrorResponse).message)
  }
}

/**
 * Fetch all delegations in stake page
 * @returns IValidator[]
 */
export const getAllDelegations = async (
  address?: string
): Promise<IStakeDelegation[] | undefined> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/cosmos/staking/v1beta1/delegations/${address}`)
    if (!data || !data.delegation_responses || !Array.isArray(data.delegation_responses))
      return undefined
    return data.delegation_responses
  } catch (error: any) {
    console.log("===getAllDelegations error====", (error as unknown as ErrorResponse).message)
  }
}