import { TEST_MODE } from '@/constants'
import * as satsConnect from 'sats-connect'
import * as bitcoin from 'bitcoinjs-lib'
import { createHTLCScript, htlcP2WSHAddress } from '@/utils/htlc'
import { AuthStateProps } from '@/types/context/auth'
import { offlineSigner, ordibankClient } from '../provider'
import BigNumber from 'bignumber.js'
import {
  INPUT_AMOUNT,
  NO_ADDRESS,
  WALLET_NOT_CONNECTED,
  WARNING_MESSAGE,
} from '@/constants/message'
import { MsgRequestLock } from '@ts-client/cfprotocol.lock/module'
import { WalletType } from '@/types/interfaces'
import { Wallet } from '../hooks/useUnisatWallet.hook'

export const SendBitcoinToHTLC = async (
  messageApi: any,
  authState: AuthStateProps,
  senderAddress: string,
  recipientAddress: string,
  htlcAmount: BigNumber,
  publicKey: string,
  htlctimeount = Math.floor(Date.now() / 1000) + 3600,
) => {
  if (!senderAddress) {
    messageApi.Alert({
      ...WARNING_MESSAGE,
      content: 'Please input the sender address',
    })
    return undefined
  }
  if (!recipientAddress) {
    messageApi.Alert({
      ...NO_ADDRESS,
      content: 'Recipient address is undefined',
    })
    return undefined
  }
  if (!authState.paymentAccount?.publicKey) {
    messageApi.Alert(WALLET_NOT_CONNECTED)
    return undefined
  }

  if (!htlcAmount || Number(htlcAmount) === 0) {
    messageApi.Alert({
      ...INPUT_AMOUNT,
      content: 'HTLC amount is undefined or 0',
    })
    return undefined
  }

  const network = TEST_MODE
    ? satsConnect.BitcoinNetworkType.Testnet
    : satsConnect.BitcoinNetworkType.Mainnet

  let bitcoinNetwork = bitcoin.networks.testnet
  if (network === satsConnect.BitcoinNetworkType.Mainnet) {
    bitcoinNetwork = bitcoin.networks.bitcoin
  }

  const htlcScript = createHTLCScript(
    senderAddress,
    publicKey,
    recipientAddress,
    htlctimeount,
    bitcoinNetwork,
  )

  // lock address
  const htlcAddress = htlcP2WSHAddress(htlcScript, bitcoinNetwork)

  if (!htlcAddress) {
    messageApi.Alert({ ...NO_ADDRESS, content: 'HTLC address is undefined' })
    return undefined
  }

  let txHash = ''
  console.log('=====amount====', Number(htlcAmount))
  console.log('===htlc address ===', htlcAddress)

  if (
    !authState.wallet ||
    !authState.wallet?.installed ||
    !authState.wallet?.accounts?.payment?.address ||
    !authState.wallet?.accounts?.payment?.address.length
  )
    return

  switch (authState.wallet?.type) {
    case WalletType.UNISAT:
    case WalletType.OKX:
    case WalletType.BITGET:
      try {
        const sendBitcoinRes = await (
          authState.wallet as Wallet
        )?.methods?.sendBitcoin(htlcAddress, htlcAmount.toNumber())
        console.log('sendBitcoinRes ===>', sendBitcoinRes)
        if (!sendBitcoinRes) return
        txHash = sendBitcoinRes
      } catch (error: any) {
        messageApi.Alert({
          ...WARNING_MESSAGE,
          content: error.message ?? 'Unknown error while sending BTC.',
        })
      }
      break

    // case WalletType.XVERSE:
    //   const sendBtcOption = {
    //     payload: {
    //       network: {
    //         type: network,
    //       },
    //       recipients: [
    //         {
    //           address: htlcAddress,
    //           amountSats: BigInt(Number(htlcAmount)),
    //         },
    //         // you can add more recipients here
    //       ],
    //       senderAddress: senderAddress,
    //     },
    //     onFinish: (response: any) => {
    //       txHash = response
    //       console.log('success =====>', response)
    //     },
    //     onCancel: () =>
    //       messageApi.Alert({
    //         ...WARNING_MESSAGE,
    //         content: 'User rejected the request.',
    //       }),
    //     onError: (error: any) => {
    //       messageApi.Alert({
    //         ...WARNING_MESSAGE,
    //         content: error.message ?? 'Unknown error while sending BTC.',
    //       })
    //     },
    //   }

    //   await satsConnect.sendBtcTransaction(sendBtcOption)
    //   break
    default:
      break
  }

  if (!!txHash === false) {
    return undefined
  }

  console.log('=========', txHash)

  const creator = await offlineSigner.getAccounts()
  const senderPubkeyHex = authState.paymentAccount?.publicKey

  function hexStringToUint8Array(hexString: string) {
    if (hexString.length % 2 !== 0) {
      throw new Error('Invalid hex string')
    }
    const arrayBuffer = new Uint8Array(hexString.length / 2)
    for (let i = 0; i < hexString.length; i += 2) {
      arrayBuffer[i / 2] = parseInt(hexString.substr(i, 2), 16)
    }
    return arrayBuffer
  }

  const value: Partial<MsgRequestLock> = {
    amount: htlcAmount.toString(),
    assetId: 1,
    creator: creator[0].address,
    fromAddress: authState.paymentAccount?.address,
    lockAddress: htlcAddress,
    senderPubkey: hexStringToUint8Array(senderPubkeyHex),
    // 1st july in seconds
    timeout: htlctimeount.toString(),
    // timeout: '1719792000',
    txHash: txHash,
    creationVout: 0,
  }

  const res = await ordibankClient.OrdibankprotocolLock.tx.sendMsgRequestLock({
    value: MsgRequestLock.fromPartial(value),
  })
  console.log('MsgRequestLock res ===>', res)
  return res
}
