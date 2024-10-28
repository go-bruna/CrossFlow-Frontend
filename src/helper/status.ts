import { VoteOption } from "@/cf-client/cosmos.gov/gov"
import { 
  PROPOSAL_STATUS_DEPOSIT_PERIOD,
  PROPOSAL_STATUS_FAILED,
  PROPOSAL_STATUS_PASSED, 
  PROPOSAL_STATUS_REJECTED, 
  PROPOSAL_STATUS_VOTING_PERIOD
} from "@/constants/status"
import { StatusProps } from "@/types/interfaces"

export const refineStatus = (status?: string) => {
  if (status === PROPOSAL_STATUS_PASSED)
    return 'executed'
  else if (status === PROPOSAL_STATUS_REJECTED || status === PROPOSAL_STATUS_FAILED)
    return 'rejected'
  else if (status === PROPOSAL_STATUS_VOTING_PERIOD || status === PROPOSAL_STATUS_DEPOSIT_PERIOD)
    return 'ongoing'
  else 
    return 'rejected'
} 

export const statusClassOverride = (status: StatusProps) => {
  const colorByStatus = {
    ongoing: 'bg-[#f6851b]/20 text-[#f6851b]',
    executed: 'bg-[#36f5cf]/20 text-[#36f5cf]',
    rejected: 'bg-[#e62d0f]/20 text-[#e62d0f]'
  }[status || 'ongoing'] as StatusProps
  return colorByStatus
}

export const refineVoteStatus = (status?: string) => {
  if (status === 'Yes') {
    return VoteOption.VOTE_OPTION_YES
  } else if (status === 'No') {
    return VoteOption.VOTE_OPTION_NO
  } else if (status === 'Abstain' ) {
    return VoteOption.VOTE_OPTION_ABSTAIN
  }
  return VoteOption.VOTE_OPTION_YES
}