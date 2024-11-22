import type { TWallet } from '@/contexts/auth'
import type { IAccount, WalletType } from '@/types/interfaces.ts'
import BigNumber from 'bignumber.js'

export interface IBitcoinHTLCRes {
  amount: string,
  assetId: number,
  creator: string
  fromAddress: string,
  lockAddress: string,
  senderPubkey: Uint8Array,
  timeout: string,
  txHash: string,
  creationVout: number,
}

export interface AuthStateProps {
  wallet: TWallet | null
  walletType: number

  connected_wallet: WalletType | null

  unisatWallet: any | undefined
  okxWallet: any | undefined
  xverseWallet: any | undefined
  bitgetWallet: any | undefined

  paymentAccount: IAccount | null | undefined
  ordinalsAccount: IAccount | null | undefined

  sendBitcoinToHTLC: (
    creator: string,
    // offlineSigner: OfflineSigner,
    messageApi: any,
    authState: AuthStateProps,
    senderAddress: string | undefined,
    recipientAddress: string | undefined,
    htlcAmount: BigNumber | undefined,
    publicKey: string | undefined,
    htlctimeount?: number,
  // ) => IBitcoinHTLCRes | undefined
  ) => Promise<IBitcoinHTLCRes | undefined>
}
export interface IAuthContext {
  authState: AuthStateProps

  unisatInstalled: boolean
  okxInstalled: boolean
  xverseInstalled: boolean
  bitgetInstalled: boolean

  connectUnisatWallet: any
  connectOkxWallet: any
  connectXVerseWallet: any
  connectBitgetWallet: any

  disconnectWallet: any
}
