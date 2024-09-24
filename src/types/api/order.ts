
export type IOrderBaseRes = {
  _id: string
  description: string
  ordinals_address: string
  order_type: number
  order_status: number
  pool_address: string
  sender_address: string
  start_time: number
}

export type IWalletInfo = {
  address: string
  name: string
}
export interface OrderResType extends IOrderBaseRes {
  btc_balance?: number
  fee_txid?: string
  fee_rate?: number
  fee_amount?: number
  end_time?: number
  remove_percentage?: number
  spent_fee?: number
  token1?: string
  token1_amount?: number
  token2_amount?: number
  token2?: string
  in_token?: string
  in_token_amount?: number
  out_token?: string
  out_token_amount?: number
  sats_txid?: string
  token_inscription_id?: string
  fees_wallet?: IWalletInfo
  assets_wallet?: IWalletInfo
}
  