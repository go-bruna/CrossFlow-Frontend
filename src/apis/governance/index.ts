import { BASE_URL } from "@/constants/endpoint"
import axios from "axios"
import { IBaseProposal, IGovernanceProposal, IGovernanceSummary } from "@/types/api/governance"

export const getGovernanceSummary = async (): Promise<IGovernanceSummary | undefined> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/Crossflow-Network/CF-Protocol/chain/get_gov_summary`)
    return data?.gov_summary
  } catch (error: any) {
    console.log("===error====", error)
  }
}

/**
 * Get proposals of governance page
 * @returns Array of Proposal
 */
export const getGovernanceProposals = async (): Promise<IBaseProposal[] | undefined> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/cosmos/gov/v1/proposals`)
    return (data as IGovernanceProposal)?.proposals
  } catch (error: any) {
    console.log("===error====", error)
  }
}

/**
 * Get details of proposal in governance page
 * @returns Proposal's detail
 */
export const getGovernanceProposalDetail = async (
  proposal_id?: string
): Promise<IBaseProposal | undefined> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/cosmos/gov/v1/proposals/${proposal_id}`)
    return data?.proposal
  } catch (error: any) {
    console.log("===error====", error)
  }
}

/**
 * Get votes of proposal in governance page
 * @returns votes array
 */
export const getGovernanceProposalVotes = async (
  proposal_id?: string
): Promise<any | undefined> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/cosmos/gov/v1/proposals/${proposal_id}/votes`)
    console.log("===Votes ===", data)
    return data
  } catch (error: any) {
    console.log("===error====", error)
  }
}

/**
 * Get votes of proposal in governance page
 * @returns votes array
 */
export const getGovernanceProposalVoteDetail = async (
  proposal_id?: string,
  vote_id?: string
): Promise<any | undefined> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/cosmos/gov/v1/proposals/${proposal_id}/votes/${vote_id}`)
    console.log("===Vote detail ===", data)
    return data
  } catch (error: any) {
    console.log("===error====", error)
  }
}