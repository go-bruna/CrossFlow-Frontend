import { BASE_MEMPOOL_URL, BASE_URL } from "@/constants/endpoint"
import { ErrorResponse } from "@/types/api/base"
import { 
  IChainStatsRes, 
  ILoanRate, 
  ILockBalance, 
  IMaxInterestRate, 
  ITssPublicKeyRes 
} from "@/types/api/other"
import { 
  IAssetBorrowedTransaction,
  IAssetLockTransaction, 
  IAssetProfile, 
  IAssetSuppliedTransaction, 
  IEstimatedRepayAmount, 
  ILoanEntity, 
  IPool, 
  IPoolSummary 
} from "@/types/api/pool"
import axios from "axios"

/**
 * To fetch pool summary to display
 * @returns pool_summary
 */
export const getPoolSummary = async (): Promise<IPoolSummary | undefined> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/Crossflow-Network/CF-Protocol/loan/get_pool_summary`)
    return data?.pool_summary
  } catch (error: any) {
    console.log("===getPoolSummary error====", (error as unknown as ErrorResponse).message)
  }
}

/**
 * Fetch all pool list
 * @returns array of pool
 */
export const getPoolList = async (): Promise<IPool[] | undefined> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/Crossflow-Network/CF-Protocol/loan/get_pool_list`)
    return data?.asset_pool
  } catch (error: any) {
    console.log("===getPoolList error====", (error as unknown as ErrorResponse).message)
  }
}

/**
 * Fetch public key that can be used for sending BTC to HTLC, get HTLC bitcoin address here.
 * @returns TssPublicKey res.
 */
export const getTssPublicKey = async (): Promise<ITssPublicKeyRes | undefined> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/Crossflow-Network/CF-Protocol/tss/tss_pubkey`)
    if (!data.tss_pubkey || !Array.isArray(data.tss_pubkey) || data.tss_pubkey.length < 1)
      return undefined
    return data
  } catch (error: any) {
    console.log("===getTssPublicKey error====", (error as unknown as ErrorResponse).message)
  }
}

/**
 * Fetch all locked transaction to display its status in lock page
 * @returns TssPublicKey res.
 */
export const getAssetLockTransaction = async (): Promise<IAssetLockTransaction | undefined> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/Crossflow-Network/CF-Protocol/lock/asset_lock_transaction`)
    if (!data || !data.asset_lock_transaction || !Array.isArray(data.asset_lock_transaction) || data.asset_lock_transaction.length < 1)
      return undefined
    return data as IAssetLockTransaction
  } catch (error: any) {
    console.log("===getAssetLockTransaction error====", (error as unknown as ErrorResponse).message)
  }
}

/**
 * Fetch all supplied transaction to display its status in supply drawer page
 * @returns TssPublicKey res.
 */
export const getAssetSupplyTransaction = async (): Promise<IAssetSuppliedTransaction | undefined> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/Crossflow-Network/CF-Protocol/lock/supply_transaction`)
    if (!data.SupplyTransaction || !Array.isArray(data.SupplyTransaction) || data.SupplyTransaction.length < 1)
      return undefined
    return data.SupplyTransaction
  } catch (error: any) {
    console.log("===getAssetSupplyTransaction error====", (error as unknown as ErrorResponse).message)
  }
}

/**
 * Fetch all borrowed transaction to display its status in borrow page
 * @returns IAssetBorrowedTransaction
 */
export const getAssetBorrowTransaction = async (): Promise<IAssetBorrowedTransaction[] | undefined> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/Crossflow-Network/CF-Protocol/loan/loan_transaction`)
    if (!data.loan_transaction || !Array.isArray(data.loan_transaction) || data.loan_transaction.length < 1)
      return undefined
    return data.loan_transaction
  } catch (error: any) {
    console.log("===getAssetBorrowTransaction error====", (error as unknown as ErrorResponse).message)
  }
}

/**
 * Fetch loan entries
 * @returns ILoanEntity[]
 */
export const getLoanEntity = async (): Promise<ILoanEntity[] | undefined> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/Crossflow-Network/CF-Protocol/loan/loan_entity`)
    if (!data.loan_entity)
      return undefined
    return data.loan_entity
  } catch (error: any) {
    console.log("===getLoanEntity error====", (error as unknown as ErrorResponse).message)
  }
}

/**
 * Fetch repay amount according to the repay_percent
 * @returns IAssetBorrowedTransaction
 */
export const getEstimatedRepayAmount = async (
  creator?: string,
  loan_id?: string,
  repay_percent?: string
): Promise<IEstimatedRepayAmount | undefined> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/Crossflow-Network/CF-Protocol/loan/estimate_repay_amount/${creator}/${loan_id}/${repay_percent}`)
    if (!data)
      return undefined
    return data
  } catch (error: any) {
    console.log("===getEstimatedRepayAmount error====", (error as unknown as ErrorResponse).message)
  }
}


/**
 * Fetch lock-balance that successfuly suplied.
 * @returns ILockBalance.
 */
export const getLockBalance = async (): Promise<ILockBalance | undefined> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/Crossflow-Network/CF-Protocol/lock/lock_balance`)
    if (!data.lock_balance || !Array.isArray(data.lock_balance) || data.lock_balance.length < 1)
      return undefined
    return data
  } catch (error: any) {
    console.log("===getLockBalance error====", (error as unknown as ErrorResponse).message)
  }
}

/**
 * Fetch max interest rate to limit 
 * @returns IMaxInterestRate.
 */
export const getMaxInterestRate = async (): Promise<IMaxInterestRate | undefined> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/Crossflow/lock/params`)
    if (!data.params)
      return undefined
    return data.params
  } catch (error: any) {
    console.log("===getMaxInterestRate error====", (error as unknown as ErrorResponse).message)
  }
}

/**
 * Fetch loan rate to limit, which has max_loan_rate and max_duration, min_interest_rate, etc. 
 * @returns ILoanRate.
 */
export const getLoanRate = async (): Promise<ILoanRate | undefined> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/Crossflow/loan/params`)
    if (!data.params)
      return undefined
    return data.params
  } catch (error: any) {
    console.log("===getLoanRate error====", (error as unknown as ErrorResponse).message)
  }
}

/**
 * Fetch asset profile to make sure all assets
 * @returns ILoanRate.
 */
export const getAssetProfiles = async (): Promise<IAssetProfile[] | undefined> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/Crossflow-Network/CF-Protocol/asset/asset_profile`)
    if (!data.asset_profile)
      return undefined
    return data.asset_profile
  } catch (error: any) {
    console.log("===getAssetProfiles error====", (error as unknown as ErrorResponse).message)
  }
}

/**
 * Fetch my bitcoin amount ( in connected wallet.)
 * @returns ILoanRate.
 */
export const getChainStats = async (address: string): Promise<IChainStatsRes | undefined> => {
  try {
    const { data } = await axios.get(`${BASE_MEMPOOL_URL}/address/${address}`)
    if (!data)
      return undefined
    return data
  } catch (error: any) {
    console.log("===getChainStats error====", (error as unknown as ErrorResponse).message)
  }
}


