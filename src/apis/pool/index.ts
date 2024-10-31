import { BASE_MEMPOOL_URL, BASE_URL } from "@/constants/endpoint"
import { 
  IChainStatsRes, 
  ILoanRate, 
  ILockBalance, 
  IMaxInterestRate, 
  ITssPublicKeyRes 
} from "@/types/api/other"
import { 
  IAssetLockTransaction, 
  IAssetProfile, 
  IPool, 
  IPoolSummary 
} from "@/types/api/pool"
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

export const getTssPublicKey = async (): Promise<ITssPublicKeyRes | undefined> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/Crossflow-Network/CF-Protocol/tss/tss_pubkey`)
    if (!data.tss_pubkey || !Array.isArray(data.tss_pubkey) || data.tss_pubkey.length < 1)
      return undefined
    return data
  } catch (error: any) {
    console.log("===error====", error)
  }
}

export const getAssetLockTransaction = async (): Promise<IAssetLockTransaction | undefined> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/Crossflow-Network/CF-Protocol/lock/asset_lock_transaction`)
    if (!data.asset_lock_transaction || !Array.isArray(data.asset_lock_transaction) || data.asset_lock_transaction.length < 1)
      return undefined
    return data
  } catch (error: any) {
    console.log("===error====", error)
  }
}

export const getLockBalance = async (): Promise<ILockBalance | undefined> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/Crossflow-Network/CF-Protocol/lock/lock_balance`)
    if (!data.lock_balance || !Array.isArray(data.lock_balance) || data.lock_balance.length < 1)
      return undefined
    return data
  } catch (error: any) {
    console.log("===error====", error)
  }
}

export const getMaxInterestRate = async (): Promise<IMaxInterestRate | undefined> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/Crossflow/lock/params`)
    if (!data.params)
      return undefined
    return data.params
  } catch (error: any) {
    console.log("===error====", error)
  }
}

export const getLoanRate = async (): Promise<ILoanRate | undefined> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/Crossflow/loan/params`)
    if (!data.params)
      return undefined
    return data.params
  } catch (error: any) {
    console.log("===error====", error)
  }
}

export const getAssetProfiles = async (): Promise<IAssetProfile[] | undefined> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/Crossflow-Network/CF-Protocol/asset/asset_profile`)
    if (!data.asset_profile)
      return undefined
    return data.asset_profile
  } catch (error: any) {
    console.log("===error====", error)
  }
}

export const getChainStats = async (address: string): Promise<IChainStatsRes | undefined> => {
  try {
    const { data } = await axios.get(`${BASE_MEMPOOL_URL}/address/${address}`)
    if (!data)
      return undefined
    return data
  } catch (error: any) {
    console.log("===error====", error)
  }
}


