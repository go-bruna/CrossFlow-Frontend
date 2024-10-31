export type PaginationProps = {
  next_key?: string | null
  total?: string
}

export type TssPublicKey = {
  bitcoin: string
  ecdsa: string
  id: string
  reserved: string
  tss_pubkey: string
}

export interface ITssPublicKeyRes {
  tss_pubkey: TssPublicKey[]
  pagination: PaginationProps
}

export interface IChainStats {
  funded_txo_count: number
  funded_txo_sum: number
  spent_txo_count: number
  spent_txo_sum: number
  tx_count: number
}

export interface IChainStatsRes {
  address: string
  chain_stats: IChainStats
  mempool_stats: IChainStats
}

export interface IBaseBalance {
  asset_id: string
  balance: string
  interest_rate: string
}
export interface IBaseLockBalance {
  balances: IBaseBalance[]
  creator: string
  id: string
  owner_wallet: string
}

export interface ILockBalance {
  lock_balance: IBaseLockBalance[]
  pagination: PaginationProps
}

export interface IMaxInterestRate {
  max_interest_rate: string
  epoch_length: string
}

export interface ILoanRate {
  min_interest_rate: string
  max_loan_rate: string
  min_liquidation: string
  max_duration: string
  epoch_length: string
}