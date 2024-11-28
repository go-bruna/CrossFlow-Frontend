export interface IAccountSummary {
  user: string
  net_apy: string
  daily_earnings: string
  total_supply: string
  total_borrow: string
  total_staked: string
  borrow_limit_used: string
  safe_limit: string
  reserved: string
}

export interface IAccountAssetsSupplies {
  user: string
  asset_id: string
  asset_symbol: string
  apy: string
  loan_rate: string
  balance: string
  reserved: string
}

export interface IAccountAssetsBorrowed {
  user: string
  collateral_asset_id: string
  collateral_asset_symbol: string
  apy: string
  loan_rate: string
  balance: string
  health: string
  reserved: string
  loan_asset_id: string
  loan_asset_symbol: string
}