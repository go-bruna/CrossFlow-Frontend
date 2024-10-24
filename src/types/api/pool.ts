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