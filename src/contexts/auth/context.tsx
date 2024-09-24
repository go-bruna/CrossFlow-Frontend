import { createContext } from 'react'
import { IAuthContext } from '@/types/context/auth'
import { WALLET_TYPE_UNISAT } from '@/constants/wallets'

const initialState = {
  connected_wallet: null,
  address: '',
  paymentAccount: undefined,
  ordinalsAccount: undefined,
  btcBalance: 0,
  walletType: WALLET_TYPE_UNISAT,
  unisatWallet: undefined,
  phantomWallet: undefined,
  okxWallet: undefined,
}

export const AuthContext = createContext<IAuthContext>({
  authState: initialState,
  account: {
    tokenBalances: [],
    poolBalanceList: [],
  },
  unisatInstalled: false,
  phantomInstalled: false,
  connectUnisatWallet: () => {},
  connectPhantomWallet: () => {},
  connectOkxWallet: () => {},
  connectXVerseWallet: () => {},
  disconnectWallet: () => {},
} as IAuthContext)

AuthContext.displayName = 'AuthContext'
