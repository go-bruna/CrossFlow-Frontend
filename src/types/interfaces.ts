// Enums
export enum TX_TYPE {
  NONE,
  BALANCE,
  APPROVE,
  STAKE,
  REDEEM,
  CLAIMALL,
  FINAL,
}

export enum MODAL_STATE {
  NONE,
  APPROVE,
  CONFIRM,
  SUBMITTED,
  SUCCEED,
  FAILED,
}

export enum STAGE_TYPE {
  WHITELIST,
  PUBLIC,
  W_NOT_STARTED,
  P_NOT_STARTED,
  ENDED,
  NONE,
}

export enum WalletType {
  UNISAT = 'unisat',
  OKX = 'okx',
  XVERSE = 'xverse',
  BITGET = 'bitget',
}

// Interfaces
export interface ITxModalContext {
  isTxModal: boolean
  modalSteps: number
  modalState: MODAL_STATE
  modalTitle: string
  modalSubTitle: string
  modalTxHash: string
  setIsTxModal: Function
  updateModalState: Function
}

export interface IToken {
  name: string
  address: `0x${string}`
  abi: any
}

export interface IDuration {
  minLabel: string
  maxLabel: string
  minDuration: number
  maxDuration: number
  bonusRate: number
  burnRate: number
  period: number
  index: number
}

export interface IStageData {
  name: string
  holdingAmount: number
  tokenPrice: number
  minCap: number
  maxCap: number
  startTime: number
  endTime: number
}

export interface ITokenInfo {
  ticker: string
  max: number
}

export interface IProcessData {
  title: string
  description: string
}

export interface IFeeConstants {
  static_fee: number
  dynamic_fee: number
}

export interface IProjectProps {
  logo: string
  description: string
  projectName: string
  tokenWalletAddress: string
  tick: string
  tokenPrice: number
  hardCap: number
  softCap: number
  minCap: number
  maxCap: number
  raisedBtcAmount: number
  stageData: IStageData[]
  processData: IProcessData[]
}

export interface IAccount {
  address: string
  addressType: string
  publicKey: string
  purpose?: string
}

export interface IStakeProps {
  lockValue: number
  selectedDuration: IDuration
  contentLabel?: string
}

export interface ITokenBaseInfo {
  icon: string
  token: string
  amount?: number | string
}

export type AddLiquidityDataProps = {
  token1: string
  token2: string
  token1_amount: number
  token2_amount: number
  ratio: number
}

export interface AddLiquidityConfirmDataProps extends AddLiquidityDataProps {
  feeRate: number
}

export interface RemoveLiquidityConfirmDataProps extends AddLiquidityDataProps {
  feeRate: number
  remove_percentage: number
}

export type SwapDataProps = {
  token1: string
  token2: string
  token1_amount: number
  ratio: number
}

export interface SwapConfirmDataProps extends SwapDataProps {
  feeRate: number
}

export interface InscriptionUTXO {
  txid: string
  vout: number
  amount: number
  isSpent: boolean
  inscriptions?: {
    inscriptionNumber: number
    inscriptionId: string
    offset: number
    moved?: boolean
    sequence?: number
    isCursed?: boolean
    isVindicate?: boolean
    isBRC20?: boolean
  }[]
}

export type BtcUTXO = {
  txid: string
  vout: number
  satoshi: number
  scriptType: string
  scriptPk: string
  codeType: number
  address: string
  height: number
  idx: number
  isOpInRBF: boolean
  isSpent: boolean
  inscriptions: any[] // Adjust the type if you know the structure of the inscriptions
}

interface ScriptSig {
  asm: string
  hex: string
}

interface Vin {
  txid: string
  vout: number
  scriptSig: ScriptSig
  txinwitness: string[]
  sequence: number
}

interface ScriptPubKey {
  asm: string
  desc: string
  hex: string
  address: string
  type: string
}

interface Vout {
  value: number
  n: number
  scriptPubKey: ScriptPubKey
}

export interface RawTransaction {
  txid: string
  hash: string
  version: number
  size: number
  vsize: number
  weight: number
  locktime: number
  vin: Vin[]
  vout: Vout[]
  hex: string
  blockhash: string
  confirmations: number
  time: number
  blocktime: number
}

export interface SignatureHeaders {
  Signature: string
  'Signature-Algorithm': string
  'Signer-Public-Key': string
  'Signer-Address': string
}

export interface ISidebar {
  title: string
  icon: JSX.Element
}

export interface ITag {
  title: string
  icon?: JSX.Element
}

export type StatusProps = 
  | 'ongoing'
  | 'executed'
  | 'rejected'