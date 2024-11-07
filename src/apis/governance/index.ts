import { BASE_URL } from "@/constants/endpoint"
import axios from "axios"
import { IBaseProposal, IGovernanceProposal, IGovernanceSummary } from "@/types/api/governance"
import { ErrorResponse } from "@/types/api/base"

export const getGovernanceSummary = async (): Promise<IGovernanceSummary | undefined> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/Crossflow-Network/CF-Protocol/chain/get_gov_summary`)
    return data?.gov_summary
  } catch (error: any) {
    console.log("===getGovernanceSummary error====", (error as unknown as ErrorResponse).message)
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
    console.log("===getGovernanceProposals error====", (error as unknown as ErrorResponse).message)
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
    console.log("===getGovernanceProposalDetail error====", (error as unknown as ErrorResponse).message)
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
    return data
  } catch (error: any) {
    console.log("===getGovernanceProposalVotes error====", (error as unknown as ErrorResponse).message)
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
    return data
  } catch (error: any) {
    console.log("===getGovernanceProposalVoteDetail error====", (error as unknown as ErrorResponse).message)
  }
}