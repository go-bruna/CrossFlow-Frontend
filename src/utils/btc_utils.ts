import { IChainStatsRes } from '@/types/api/other'
import { base64, hex } from '@scure/base'
import * as btc from '@scure/btc-signer'
import axios from 'axios'

import { BitcoinNetworkType } from 'sats-connect'

export type UTXO = {
  txid: string
  vout: number
  status: {
    confirmed: boolean
    block_height?: number
    block_hash?: string
    block_time?: number
  }
  value: number
}

export const getUTXOs = async (
  network: BitcoinNetworkType,
  address: string
): Promise<UTXO[]> => {
  const networkSubpath =
    network === BitcoinNetworkType.Testnet ? '/testnet' : ''

  const url = `https://mempool.space${networkSubpath}/api/address/${address}/utxo`
  const response = await fetch(url)

  return response.json()
}

export async function broadcastTransaction(
  rawHex: string,
  networkSubpath = ''
) {
  // Define the URL for broadcasting the transaction
  const url = `https://mempool.space${networkSubpath}/api/tx`

  // Send the transaction to the mempool.space API
  try {
    const response = await axios.post(url, rawHex)
    return response.data // or handle the response as needed
  } catch (error) {
    throw error
  }
}

export const createPSBT = async (
  networkType: BitcoinNetworkType,
  paymentPublicKeyString: string,
  ordinalsPublicKeyString: string,
  paymentUnspentOutputs: UTXO[],
  ordinalsUnspentOutputs: UTXO[],
  recipient1: string,
  recipient2: string
) => {
  console.log('ordinalsPublicKeyString ===>', ordinalsPublicKeyString)
  console.log('ordinalsUnspentOutputs ===>', ordinalsUnspentOutputs)
  console.log('recipient2 ===>', recipient2)
  const network =
    networkType === BitcoinNetworkType.Testnet ? btc.TEST_NETWORK : btc.NETWORK

  // choose first unspent output
  const paymentOutput = paymentUnspentOutputs[0]

  const paymentPublicKey = hex.decode(paymentPublicKeyString)

  const tx = new btc.Transaction({
    allowUnknownOutputs: true,
  })

  // create segwit spend
  const p2wpkh = btc.p2wpkh(paymentPublicKey, network)
  const p2sh = btc.p2sh(p2wpkh, network)

  // set transfer amount and calculate change
  const fee = 300n // set the miner fee amount
  const recipient1Amount = BigInt(Math.min(paymentOutput.value, 3000)) - fee

  console.log('redeemScript = ' + hex.encode(p2sh.redeemScript!))
  // console.log("witnessScript = " + p2sh.witnessScript? hex.encode(p2sh.witnessScript!) : "undefined");

  // payment input
  tx.addInput({
    txid: paymentOutput.txid,
    index: paymentOutput.vout,
    witnessUtxo: {
      script: p2sh.script ? p2sh.script : Buffer.alloc(0),
      amount: BigInt(paymentOutput.value),
    },
    redeemScript: p2sh.redeemScript ? p2sh.redeemScript : Buffer.alloc(0),
    witnessScript: p2sh.witnessScript,
    sighashType: btc.SigHash.SINGLE_ANYONECANPAY,
  })

  tx.addOutputAddress(recipient1, recipient1Amount, network)

  tx.addOutput({
    script: btc.Script.encode([
      'HASH160',
      'DUP',
      new TextEncoder().encode('SP1KSN9GZ21F4B3DZD4TQ9JZXKFTZE3WW5GXREQKX'),
    ]),
    amount: 0n,
  })

  const psbt = tx.toPSBT(0)
  const psbtB64 = base64.encode(psbt)
  return psbtB64
}

export const calcBTCBalance = (data: IChainStatsRes | undefined) => {
  if (!data)
    return 0
  const amount = data.chain_stats.funded_txo_sum - data.chain_stats.spent_txo_sum
  return amount
}