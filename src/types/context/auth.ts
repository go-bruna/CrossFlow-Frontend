import type { TWallet } from '@/contexts/auth'
import type { IAccount, WalletType } from '@/types/interfaces.ts'
// import { DeliverTxResponse } from '@cosmjs/stargate'
// import BigNumber from 'bignumber.js'

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

  // sendBitcoinToHTLC: (
  //   messageApi: any,
  //   authState: AuthStateProps,
  //   senderAddress: string,
  //   recipientAddress: string,
  //   htlcAmount: BigNumber,
  //   publicKey: string,
  //   htlctimeount?: number,
  // ) => Promise<DeliverTxResponse | undefined>
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
