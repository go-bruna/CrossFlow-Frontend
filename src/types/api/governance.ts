export interface IGovernanceSummary {
  total_proposals: string,
  total_staked: string
}

export type ProposalStatusProps = 
  | 'PROPOSAL_STATUS_PASSED'
  | 'PROPOSAL_STATUS_UNSPECIFIED'
  | 'PROPOSAL_STATUS_DEPOSIT_PERIOD'
  | 'PROPOSAL_STATUS_VOTING_PERIOD'
  | 'PROPOSAL_STATUS_REJECTED'
  | 'PROPOSAL_STATUS_FAILED'

export interface IPagination {
  next_key: string | null
  total: string
}

export type ProposalFinallyResultProps = {
  abstain_count: string
  no_count: string
  no_with_veto_count: string
  yes_count: string
}

export type ProposalMessageContentProps = {
  '@type': string
  description: string
  title: string
}

export type ProposalMessageProps = {
  '@type': string
  authority: string
  content: ProposalMessageContentProps
}

export type ProposalTotalDepositProps = {
  amount: string
  denom: string
}

export interface IBaseProposal {
  id: string
  deposit_end_time: string
  expedited: boolean
  failed_reason?: string
  final_tally_result: ProposalFinallyResultProps
  messages: ProposalMessageProps[]
  metadata: string
  proposer: string
  status: string
  submit_time: string
  summary: string
  title: string
  total_deposit: ProposalTotalDepositProps[]
  voting_end_time: string
  voting_start_time: string
}

export interface IGovernanceProposal {
  pagination: IPagination
  proposals: IBaseProposal[]
}