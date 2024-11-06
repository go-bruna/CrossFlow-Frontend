import { SigningStargateClient, StdFee } from "@cosmjs/stargate";
import { Registry, OfflineSigner, EncodeObject } from "@cosmjs/proto-signing";
import { MsgVote } from "./cosmos.gov/tx";
import { cosmoshub } from "@/config/graz";
import { MsgRequestLock, MsgRequestSupply } from "./cfprotocol.lock/tx";
import { MsgRequestLoan, MsgRequestRepay } from "./cfprotocol.loan/tx";
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
  ["/cfprotocol.loan.MsgRequestLoan", MsgRequestLoan],
  ["/cfprotocol.loan.MsgRequestRepay", MsgRequestRepay],
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
    signAndBroadcast: (
      msgs: EncodeObject[],
      { fee, memo }: SignAndBroadcastOptions = { fee: defaultFee, memo: "" }
    ) => client.signAndBroadcast(address, msgs, fee, memo),
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
    msgRequestLoan: (data: MsgRequestLoan): EncodeObject => ({
      typeUrl: "/cfprotocol.loan.MsgRequestLoan",
      value: MsgRequestLoan.fromPartial(data),
    }),
    msgRequestRepay: (data: MsgRequestRepay): EncodeObject => ({
      typeUrl: "/cfprotocol.loan.MsgRequestRepay",
      value: MsgRequestRepay.fromPartial(data),
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