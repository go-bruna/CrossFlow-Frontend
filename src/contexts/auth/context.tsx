import { createContext } from 'react'
import { WALLET_TYPE_UNISAT } from '@/constants/wallets'
import type { IAuthContext } from '@/types/context/auth'

const initialState = {
  wallet: null,
  walletType: WALLET_TYPE_UNISAT,

  connected_wallet: null,

  unisatWallet: null,
  okxWallet: null,
  xverseWallet: null,
  bitgetWallet: null,

  paymentAccount: undefined,
  ordinalsAccount: undefined,

  sendBitcoinToHTLC: () => ({}) as any,
}

export const AuthContext = createContext<IAuthContext>({
  authState: initialState,
  account: {
    tokenBalances: [],
    poolBalanceList: [],
  },

  unisatInstalled: false,
  okxInstalled: false,
  xverseInstalled: false,
  bitgetInstalled: false,

  connectUnisatWallet: () => {},
  connectOkxWallet: () => {},
  connectXVerseWallet: () => {},
  connectBitgetWallet: () => {},

  disconnectWallet: () => {},
} as IAuthContext)

AuthContext.displayName = 'AuthContext'
