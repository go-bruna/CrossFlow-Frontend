export interface IStakeSummary {
  cfn_stake_apr: string,
  daily_emission: string,
  total_staked: string,
  user: string,
  user_staked: string
}

// Delegate ( Stake )
export interface IBaseDelegation {
  delegator_address: string
  validator_address: string
  shares: string
}

export interface IBalance {
  denom: string
  amount: string
}
export interface IStakeDelegation {
  delegation: IBaseDelegation
  balance: IBalance
}

// Validator
export interface IConsensusPublicKey {
  '@type': string
  key: string
}
export interface IValidatorDescription {
  moniker: string
  identity: string
  website: string
  security_contact: string
  details: string
}
export interface IValidatorCommissionRate {
  rate: string
  max_rate: string
  max_change_rate: string
}
export interface IValidatorCommission {
  commission_rates: IValidatorCommissionRate
  update_time: string
}
export interface IValidator {
  operator_address: string
  consensus_pubkey: IConsensusPublicKey
  jailed: boolean
  status: string
  tokens: string
  delegator_shares: string
  description: IValidatorDescription
  unbonding_height: string
  unbonding_time: string
  commission: IValidatorCommission
  min_self_delegation: string
  unbonding_on_hold_ref_count: string
  unbonding_ids: string[]
}