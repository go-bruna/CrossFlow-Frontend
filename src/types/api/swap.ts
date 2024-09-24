export type IBaseSwap = {
  in_token: string
  out_token: string
}

export interface ICreateSwapReq extends IBaseSwap {
  sender_address: string
  ordinals_address: string
  fee_txid: string,
  fee_rate: number,
  token_inscription_id: string
}

export interface ISwapPreviewReq extends IBaseSwap {
  sender_address: string
  in_token_amount: number,
  fee_rate: number
}

export interface ISwapPreview extends IBaseSwap {
  fee_amount: number
  in_token_amount: number
  out_token_amount: number
  slippage: number
}