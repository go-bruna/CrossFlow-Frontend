import { IAccount, WalletType } from '@/types/interfaces.ts'

export interface AuthStateProps {
  connected_wallet: WalletType | null
  paymentAccount: IAccount | null | undefined
  ordinalsAccount: IAccount | null | undefined
  walletType: number
  unisatWallet: any | undefined
  phantomWallet: any | undefined
  okxWallet: any | undefined
}

export interface IAuthContext {
  authState: AuthStateProps
  unisatInstalled: boolean
  phantomInstalled: boolean
  connectUnisatWallet: Function
  connectPhantomWallet: Function
  connectOkxWallet: Function
  connectXVerseWallet: Function
  disconnectWallet: Function
}
