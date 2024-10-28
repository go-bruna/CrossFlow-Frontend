import { WalletType } from "@/types/interfaces";
import { useEffect, useState } from "react";
import { AuthContext } from "./context";

import { IContextChildrenProps } from "@/types/context";

import {
	WALLET_TYPE_BITGET,
	WALLET_TYPE_OKX,
	// WALLET_TYPE_OKX,
	WALLET_TYPE_UNISAT,
	WALLET_TYPE_XVERSE,
} from "@/constants/wallets";
import { queryClient } from "@/wagmi";
// import { 
// 	DirectSecp256k1HdWallet, 
// 	OfflineDirectSigner 
// } from "@cosmjs/proto-signing";
// import { Client } from '@ts-client/index'
// import { cosmoshub } from "@/config/graz";

// hooks
import {
  useUnisatWallet,
  Wallet as IUnisatWallet,
} from './hooks/useUnisatWallet.hook'
import { useOkxWallet, Wallet as IOkxWallet } from './hooks/useOkxWallet.hook'
import {
  useXverseWallet,
  Wallet as IXverseWallet,
} from './hooks/useXverseWallet.hook'
import {
  useBitgetWallet,
  Wallet as IBitgetWallet,
} from './hooks/useBitgetWallet.hook'
import { getCookie } from "@/utils";

// functions
// import { SendBitcoinToHTLC } from './functions/send-btc-to-htlc'

declare global {
	interface Window {
		unisat?: any;
		phantom?: any;
		// okxwallet?: any
    bitkeep?: any;
	}
}

// const mnemonic =
//   'betray theory cargo way left cricket doll room donkey wire reunion fall left surprise hamster corn village happy bulb token artist twelve whisper expire'

// const getSignerFromMnemonic = async (): Promise<OfflineDirectSigner> => {
//   return DirectSecp256k1HdWallet.fromMnemonic(mnemonic.toString(), {
//     prefix: 'cfn',
//   })
// }

// export const offlineSigner = await getSignerFromMnemonic()
// export const crossflowClient = new Client(
//   {
//     rpcURL: cosmoshub.rpc,
//     apiURL: cosmoshub.rest,
//     prefix: 'cfn',
//   },
//   offlineSigner,
// )

export const invalidateWalletQueries = (walletAddress: string) => {
  queryClient.invalidateQueries({
    predicate: (query) => {
      return query.queryKey.includes(walletAddress)
    },
  })
}

export type TWallet = (
  | IUnisatWallet
  | IOkxWallet
  | IXverseWallet
  | IBitgetWallet
) & {
  disconnect: Function
}

export const AuthStateProvider: React.FC<IContextChildrenProps> = ({
	children,
}): JSX.Element => {
	const [wallet, setWallet] = useState<TWallet | null>(null)
  const {
    wallet: unisatWallet,
    connect: connectUnisatWallet,
    disconnect: disconnectUnisatWallet,
  } = useUnisatWallet()

  const {
    wallet: okxWallet,
    connect: connectOkxWallet,
    disconnect: disconnectOkxWallet,
  } = useOkxWallet()

  const {
    wallet: xverseWallet,
    connect: connectXVerseWallet,
    disconnect: disconnectXVerseWallet,
  } = useXverseWallet()

  const {
    wallet: bitgetWallet,
    connect: connectBitgetWallet,
    disconnect: disconnectBitgetWallet,
  } = useBitgetWallet()

	const connected_wallet: WalletType | null | undefined =
    getCookie('connected_wallet')
		
	const handleWalletSelect = () => {
    switch (connected_wallet) {
      case WalletType.UNISAT:
        return setWallet({
          ...unisatWallet,
          disconnect: disconnectUnisatWallet,
        })
      case WalletType.OKX:
        return setWallet({
          ...okxWallet,
          disconnect: disconnectOkxWallet,
        })
      case WalletType.XVERSE:
        return setWallet({
          ...xverseWallet,
          disconnect: disconnectXVerseWallet,
        })
      case WalletType.BITGET:
        return setWallet({
          ...bitgetWallet,
          disconnect: disconnectBitgetWallet,
        })

      default:
        return
    }
  }

  useEffect(() => {
    handleWalletSelect()
  }, [connected_wallet, unisatWallet, okxWallet, xverseWallet, bitgetWallet])

  const WALLET_TYPE =
    {
      unisat: WALLET_TYPE_UNISAT,
      okx: WALLET_TYPE_OKX,
      xverse: WALLET_TYPE_XVERSE,
      bitget: WALLET_TYPE_BITGET,
    }[wallet?.type as string] ?? -1

  return (
    <AuthContext.Provider
      value={{
        authState: {
          wallet,
          walletType: WALLET_TYPE,

          connected_wallet,

          unisatWallet,
          okxWallet,
          xverseWallet,
          bitgetWallet,

          paymentAccount: wallet?.accounts?.payment,
          ordinalsAccount: wallet?.accounts?.ordinals,

          // sendBitcoinToHTLC: SendBitcoinToHTLC,
        },

        unisatInstalled: unisatWallet?.installed ?? false,
        okxInstalled: okxWallet?.installed ?? false,
        xverseInstalled: xverseWallet?.installed ?? false,
        bitgetInstalled: bitgetWallet?.installed ?? false,

        connectUnisatWallet,
        connectOkxWallet,
        connectXVerseWallet,
        connectBitgetWallet,

        disconnectWallet: wallet?.disconnect ?? (() => {}),
      }}
    >
      {children}
    </AuthContext.Provider>
  )
};
