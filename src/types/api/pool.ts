import { IWalletInfo } from './order'

export interface ITokenPairRes {
  assets_wallet: IWalletInfo
  fees_wallet: IWalletInfo
  ratio: number
  timestamp: number
  token1: string
  token2: string
  tvl: number
  fee: number
  token1_amount: number
  token2_amount: number
  token1_amount_sats: number
  token2_amount_sats: number
  day_total_volume: number
  day_total_volume_change: number
  day_total_fees: number
  day_total_fees_change: number
}

export interface ICreatePool {
  sender_address: string
  token1: string
  token2: string
  token_type: 'BRC20' | 'RUNE'
}

export interface IPool {
  token1: string
  token2: string
  address: string
  tvl: string
  ratio: number
  fee_percentage: number
  day_volume: number
  week_volume: number
}

export type IAddLiquidityReq = {
  sender_address: string
  ordinals_address: string
  sats_txid: string
  token1: string
  token2: string
  token_inscription_id: string
}

export type IRemoveLiquidityReq = {
  sender_address: string
  ordinals_address: string
  fee_rate: number
  token1: string
  token2: string
  remove_percentage: number
}

export type IUserLiquidity = {
  token1: string
  token1_amount: number
  token2: string
  token2_amount: number
}

export type TransferableInscription = {
  data: TransferrableInscriptionData
  inscriptionNumber: number
  inscriptionId: string
  satoshi: number
  confirmations: number
}

export type TransferrableInscriptionData = {
  op: string
  tick: string
  lim: string
  amt: string
  decimal: string
}

export type InscriptionBase = {
  inscriptionId: string
  inscriptionNumber: number
  address: string
  outputValue: number
  preview: string
  content: string
  contentLength: number
  contentType: string
  timestamp: number
  genesisTransaction: string
  location: string
  output: string
  offset: number
}
export type IInscription = {
  total: number
  list: InscriptionBase[]
}

export type InscriptionInfoProps = {
  p: string
  op: string
  tick: string
  amt: string
}

export type IWhitelistAddress = {
  btcAddress: string
  ethAddress: string
  stakedAmount: string
  signature: string
}

export type IPoolBalance = {
  balance1: number
  balance2: number
  token1: string
  token2: string
}

export type ITokenBalance = {
  ticker: string
  balance: number
}
