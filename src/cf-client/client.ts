import { SigningStargateClient, StdFee } from "@cosmjs/stargate";
import { Registry, OfflineSigner, EncodeObject } from "@cosmjs/proto-signing";
import { MsgVote } from "./cosmos.gov/tx";
import { cosmoshub } from "@/config/graz";
import { MsgRequestLock, MsgRequestSupply, MsgRequestSupplyUsdt } from "./cfprotocol.lock/tx";
import { MsgRequestLoan, MsgRequestRepay, MsgRequestRepayLock } from "./cfprotocol.loan/tx";
import { MsgWithdrawDelegatorReward } from "./cosmos.circuit.v1/tx";
import { MsgDelegate } from "./cosmos.circuit.v1.staking/tx";

const defaultFee = {
  amount: [],
  gas: "2000000",
};

interface SignAndBroadcastOptions {
  fee: StdFee;
  memo?: string;
}

const types = [
  ["/cosmos.gov.v1.MsgVote", MsgVote],
  ["/cfprotocol.lock.MsgRequestLock", MsgRequestLock],
  ["/cfprotocol.lock.MsgRequestSupply", MsgRequestSupply],
  ["/cfprotocol.lock.MsgRequestSupplyUsdt", MsgRequestSupplyUsdt],
  ["/cfprotocol.loan.MsgRequestLoan", MsgRequestLoan],
  ["/cfprotocol.loan.MsgRequestRepay", MsgRequestRepay],
  ["/cfprotocol.loan.MsgRequestRepayLock", MsgRequestRepayLock],
  ["/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward", MsgWithdrawDelegatorReward],
  ["/cosmos.staking.v1beta1.MsgDelegate", MsgDelegate]
];


export const registry = new Registry(<any>types);

export const TxClient = async (offlineSinger: OfflineSigner) => {
    const client = await SigningStargateClient.connectWithSigner(
      // process.env.CROSSFLOW_TESTNET_RPC,
      cosmoshub.rpc,
      offlineSinger,
      { registry }
    );
    const { address } = (await offlineSinger.getAccounts())[0];
    
    return {
      signAndBroadcast: async (
        msgs: EncodeObject[],
        { fee, memo }: SignAndBroadcastOptions = { fee: defaultFee, memo: "" }
      ) => {
        try {
          return await client.signAndBroadcast(address, msgs, fee, memo)
        } catch (error) {
          console.log("broadcast error =====>", error)
          return undefined
        }
      }, 
      msgVote: (data: MsgVote): EncodeObject => ({
        typeUrl: "/cosmos.gov.v1.MsgVote",
        value: MsgVote.fromPartial(data),
      }),
      msgRequestLock: (data: MsgRequestLock): EncodeObject => ({
        typeUrl: "/cfprotocol.lock.MsgRequestLock",
        value: MsgRequestLock.fromPartial(data),
      }),
      msgRequestSupply: (data: MsgRequestSupply): EncodeObject => ({
        typeUrl: "/cfprotocol.lock.MsgRequestSupply",
        value: MsgRequestSupply.fromPartial(data),
      }),
      msgRequestSupplyUSDT: (data: MsgRequestSupplyUsdt): EncodeObject => ({
        typeUrl: "/cfprotocol.lock.MsgRequestSupplyUsdt",
        value: MsgRequestSupplyUsdt.fromPartial(data),
      }),
      msgRequestLoan: (data: MsgRequestLoan): EncodeObject => ({
        typeUrl: "/cfprotocol.loan.MsgRequestLoan",
        value: MsgRequestLoan.fromPartial(data),
      }),
      msgRequestRepay: (data: MsgRequestRepay): EncodeObject => ({
        typeUrl: "/cfprotocol.loan.MsgRequestRepay",
        value: MsgRequestRepay.fromPartial(data),
      }),
      msgRequestRepayLock: (data: MsgRequestRepayLock): EncodeObject => ({
        typeUrl: "/cfprotocol.loan.MsgRequestRepayLock",
        value: MsgRequestRepayLock.fromPartial(data),
      }),
      msgWithdrawDelegatorReward: (data: MsgWithdrawDelegatorReward): EncodeObject => ({
        typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
        value: MsgWithdrawDelegatorReward.fromPartial(data),
      }),
      msgDelegate: (data: MsgDelegate): EncodeObject => ({
        typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
        value: MsgDelegate.fromPartial(data),
      }),
    };

};