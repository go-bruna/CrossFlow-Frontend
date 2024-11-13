// Enums
export enum MODAL_STATE {
  NONE,
  APPROVE,
  CONFIRM,
  SUBMITTED,
  SUCCEED,
  FAILED,
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

export interface ITokenInfo {
  ticker: string
  max: number
}

export interface IAccount {
  address: string
  addressType: string
  publicKey: string
  purpose?: string
}
export interface ITokenBaseInfo {
  icon: string
  token: string
  amount?: number | string
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
  path: string
}

export interface ITag {
  title: string
  value?: number | string
  icon?: JSX.Element
}

export type StatusProps = 
  | 'ongoing'
  | 'executed'
  | 'rejected'