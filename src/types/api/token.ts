export interface IBRC20Token {
  _id: string
  ticker: string
  selfMint: false
  holdersCount: number
  historyCount: number
  inscriptionNumber: number
  inscriptionId: string
  max: string
  limit: string
  minted: string
  totalMinted: string
  confirmedMinted: string
  confirmedMinted1h: string
  confirmedMinted24h: string
  mintTimes: number
  decimal: number
  creator: string
  txid: string
  deployHeight: number
  deployBlocktime: number
  completeHeight: number
  completeBlocktime: number
  inscriptionNumberStart: number
  inscriptionNumberEnd: number
}

export interface ITokenPriceRes {
  USDPrice: number
}