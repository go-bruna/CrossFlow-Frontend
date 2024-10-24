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