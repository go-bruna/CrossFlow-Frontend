import { PaginationProps } from './other'

export interface IPoolSummary {
  assets: string
  available_liquidity: string
  daily_cfn_rewards: string
  reserved: string
  total_borrow: string
  total_supply: string
}

export interface IPool {
  apy: string
  apy2: string
  asset_id: string
  asset_symbol: string
  chain_symbol: string
  borrow_apy: string
  health: string
  liquidity: string
  liquidity_in_dollar: string
  price: string
  reserved: string
  total_borrow: string
  total_borrow_in_dollar: string
  total_supply: string
  total_supply_in_dollar: string
}

export interface IBaseLockTransaction {
  amount: string
  asset_id: string
  creation_vout: string
  creator: string
  err_reason: string
  id: string
  lock_address: string
  pull_status: string
  sender_address: string
  sender_pubkey: string
  status: string
  timestamp: string
  tx_hash: string
}
export interface IAssetLockTransaction {
  asset_lock_transaction: IBaseLockTransaction[]
  pagination: PaginationProps
}

export interface IAssetProfile {
  asset_type: string
  contract_address: string
  decimals: string
  deployer_address: string
  id: string
  inscription_id: string
  name: string
  rune_id: string
  symbol: string
  total_supply: string
}
// export interface IAssetProfiles {
//   asset_profile: IBaseAssetProfile[]
//   pagination: PaginationProps
// }

export interface IAssetBorrowedTransaction {
  collateral_amount: string
  collateral_id: string
  collateral_symbol: string
  confirmed_block_hash: string
  creator: string
  fail_reason: string
  handle_id: string
  id: string
  interest_rate: string
  loan_address: string
  loan_amount: string
  loan_duration: string
  loan_rate: string
  oracle_price: string
  processing: true
  release_fail_count: string
  release_hash: string
  reserved: string
  status: string
  time: string
  timestamp: string
  tss_msg_id: string
}

export interface IAssetSuppliedTransaction {
  supplier: string
  amount: string
  confirmed_block_hash: string
  fail_reason: string
  handle_id: string
  id: string
  interest_rate: string
  lock_id: string
  processing: true
  pull_fail_count: string
  reserved: string
  status: string
  timestamp: string
  tss_hash: string
  tss_msg_id: string
}

export interface IUSDTSuppliedTransaction {
  amount: string
  asset_id: string
  asset_symbol: string
  chain_symbol: string
  confirmed_block_hash: string
  fail_reason: string
  handle_id: string
  id: string
  interest_rate: string
  processing: true
  pull_fail_count: string
  reserved: string
  sender_address: string
  status: string
  supplier: string
  timestamp: string
  tss_hash: string
  tss_msg_id: string
}

export interface IBaseLoan {
  collateral_amount: string
  collateral_id: string
  collateral_symbol: string
  health: string
  interest_rate: string
  loan_address: string
  loan_amount: string
  loan_duration: string
  loan_rate: string
  loan_tx_id: string
  oracle_price: string
  reserved: string
  status: string
  origin_chain: string
  target_chain: string
  target_asset_id: string
}
export interface ILoanEntity {
  creator: string
  id: string
  loans: IBaseLoan[]
}

export interface IEstimatedRepayAmount {
  amount_repay: string
  amount_return: string
}

export interface IAssetPrice {
  asset_symbol: string
  price: string
}