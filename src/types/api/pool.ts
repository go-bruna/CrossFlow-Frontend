import { PaginationProps } from "./other"

export interface IPoolSummary {
  assets: string,
  available_liquidity: string,
  daily_cfn_rewards: string,
  reserved: string,
  total_borrow: string,
  total_supply: string
}

export interface IPool {
  apy: string,
  apy2: string,
  asset_id: string,
  asset_symbol: string,
  chain_symbol: string,
  borrow_apy: string,
  health: string,
  liquidity: string,
  liquidity_in_dollar: string,
  price: string,
  reserved: string,
  total_borrow: string,
  total_borrow_in_dollar: string,
  total_supply: string,
  total_supply_in_dollar: string
}

export interface IBaseLockTransaction {
  amount: string,
  asset_id: string,
  creation_vout: string,
  creator: string,
  err_reason: string,
  id: string,
  lock_address: string,
  pull_status: string,
  sender_address: string,
  sender_pubkey: string,
  status: string,
  timestamp: string,
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