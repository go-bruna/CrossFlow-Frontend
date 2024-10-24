import { BASE_URL } from "@/constants/endpoint"
import { IAccountAssetsBorrowed, IAccountAssetsSupplies, IAccountSummary } from "@/types/api/account"
import axios from "axios"


export const getAccountSummary = async (
  address?: string
): Promise<IAccountSummary | undefined> => {
  
  try {
    const { data } = await axios.get(`${BASE_URL}/Crossflow-Network/CF-Protocol/loan/get_account_summary/${address}`)
    return data?.account_summary
  } catch (error: any) {
    console.log("===error====", error)
  }
}

export const getAccountSuppliesAssets = async (
  address?: string
): Promise<IAccountAssetsSupplies[] | undefined> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/Crossflow-Network/CF-Protocol/loan/get_account_supplied_assets/${address}`)
    return data.asset_supplied
  } catch (error: any) {
    console.log("===error====", error)
  }
}

export const getAccountBorrowedAssets = async (
  address?: string
): Promise<IAccountAssetsBorrowed[] | undefined> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/Crossflow-Network/CF-Protocol/loan/get_account_borrowed_assets/${address}`)
    return data.asset_borrowed
  } catch (error: any) {
    console.log("===error====", error)
  }
}