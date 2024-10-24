// declare const bitcoin: any;
import * as bitcoin from "bitcoinjs-lib" // you may comment this out during development to use the Node.js library so that you can get intellisense
// import { Buffer } from 'buffer'

import { base64 } from '@scure/base'
import * as btc from '@scure/btc-signer'
import { UTXO } from './btc_utils'
import { sha256 } from '@noble/hashes/sha256'

// Compute HASH160 of a public key
function hash160(publicKey: string): Buffer {
  // Convert the public key from a hex string to a buffer
  const publicKeyBuffer = Buffer.from(publicKey, 'hex')
  // Compute the HASH160 (SHA-256 followed by RIPEMD-160) of the public key
  const hash160Buffer = bitcoin.crypto.hash160(publicKeyBuffer)
  return hash160Buffer
}

export function createHTLCScript(
  senderAddress: string,
  senderPublicKey: string,
  recipientAddress: string,
  timeout: number,
  network: any
): Buffer {
  console.log('senderAddress = ' + senderAddress)
  console.log('senderPublicKey = ' + senderPublicKey)
  console.log('recipientAddress = ' + recipientAddress)
  console.log('timeout = ' + timeout)
  console.log('network = ' + network)

  let recipientAddressCheck
  try {
    recipientAddressCheck = bitcoin.address.fromBech32(recipientAddress)
    console.log("recipientAddressCheck ===", recipientAddressCheck)
  } catch (error: any) {
    throw new Error(`Failed to decode recipient address: ${error.message}`)
  }
  if (!recipientAddressCheck) {
    throw new Error('Failed to decode recipient address')
  }

  const senderPKH = hash160(senderPublicKey)
  console.log('senderPKH:', senderPKH.toString('hex'))

  const recipientPKH = recipientAddressCheck.data
  console.log('recipientPKH:', recipientPKH.toString('hex'))

  // Reminder: the input to the HTLC script is <signature> <publicKey>
  // Define the HTLC script
  // <signature> <public key>  0
  const script = bitcoin.script.compile([
    bitcoin.opcodes.OP_DUP, // duplicate the <publicKey> value at the top of the stack
    bitcoin.opcodes.OP_HASH160, // push the hash of the <publicKey> to the stack
    recipientPKH, // recipient's public key hash
    bitcoin.opcodes.OP_EQUAL, // check if the hash of the public key matches the hash in the recipient's address
    bitcoin.opcodes.OP_IF,
    bitcoin.opcodes.OP_DUP, //  we have to expand the payment script because this will already be in the witness
    bitcoin.opcodes.OP_HASH160,
    recipientPKH,
    bitcoin.opcodes.OP_EQUALVERIFY,
    bitcoin.opcodes.OP_CHECKSIG,
    bitcoin.opcodes.OP_ELSE,
    bitcoin.script.number.encode(Number(timeout)),
    bitcoin.opcodes.OP_CHECKLOCKTIMEVERIFY,
    bitcoin.opcodes.OP_DROP,
    bitcoin.opcodes.OP_DUP, // PKH script from sender's public key
    bitcoin.opcodes.OP_HASH160,
    senderPKH,
    bitcoin.opcodes.OP_EQUALVERIFY,
    bitcoin.opcodes.OP_CHECKSIG, // this is done like this because it's not possible to run a P2SH-P2WPKH script due to already using the witness for the HTLC script
    bitcoin.opcodes.OP_ENDIF,
    Buffer.from(senderPublicKey, 'hex'), // needs to be added to satisfy the public key search in @scure/btc-signer used in XVerse, otherwise an error will be thrown
    bitcoin.opcodes.OP_DROP, // there is no way to fix it on our end through a fork because Xverse import the standard @scure/btc-signer library.  In the future we cna optimize this script to remove the redundant step
  ])

  return script
}

// Calculate the P2WSH address from the HTLC script
export function htlcP2WSHAddress(
  htlcScript: any,
  network: any
): string | undefined {
  const p2wsh = bitcoin.payments.p2wsh({
    redeem: { output: htlcScript, network },
    network,
  })
  return p2wsh.address
}

// Function to decode a base64-encoded PSBT
export function decodeBase64PSBT(base64Psbt: string) {
  // Decode the base64 PSBT into a buffer
  const psbtBuffer = Buffer.from(base64Psbt, 'base64')
  // Parse the PSBT buffer into a PSBT object
  const psbt = btc.Transaction.fromPSBT(psbtBuffer, {
    allowUnknownInputs: true,
  })

  return psbt
}

export function createReclaimPsbt(
  reclaimerAddress: string,
  htlcAmount: bigint,
  htlcTimeout: bigint,
  htlcScript: Buffer,
  htlcOutput: UTXO,
  network: any,
  fee: bigint
) {
  const htlcScriptHash = sha256(htlcScript)
  const htlcScriptHex = Buffer.from(htlcScript).toString('hex')
  console.log('htlcScriptHex = ' + htlcScriptHex)
  const scriptPubKey = btc.Script.encode(['OP_0', htlcScriptHash]) // the scriptPubKey of the HTLC UTXO

  const lockTimeBigEndian = Number(htlcTimeout) + 1 // this is the next available time to reclaim the HTLC output

  const tx = new btc.Transaction({
    allowUnknownOutputs: true,
    lockTime: lockTimeBigEndian, // the HTLC output can be reclaimed after the timeout
    version: 0,
  })

  const reclaimedAmount = BigInt(htlcAmount) - fee

  // add the output to the reclaimer
  tx.addOutputAddress(reclaimerAddress, reclaimedAmount, network)

  // add the input
  tx.addInput({
    txid: htlcOutput.txid,
    index: htlcOutput.vout,
    witnessUtxo: {
      script: scriptPubKey,
      amount: BigInt(htlcAmount),
    },
    witnessScript: htlcScript,
    sequence: 0xfffffffe, // non-final sequence number needed to enable locktime
    sighashType: btc.SigHash.ALL,
  })

  const psbt = tx.toPSBT(0)
  console.log('txHex = ' + tx.hex)
  const psbtB64 = base64.encode(psbt)
  return psbtB64
}

