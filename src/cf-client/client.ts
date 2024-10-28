import { SigningStargateClient, StdFee } from "@cosmjs/stargate";
import { Registry, OfflineSigner, EncodeObject } from "@cosmjs/proto-signing";
import { MsgVote } from "./cosmos.gov/tx";
import { cosmoshub } from "@/config/graz";

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
];

export const registry = new Registry(<any>types);

export const TxClient = async (wallet: OfflineSigner) => {
  const client = await SigningStargateClient.connectWithSigner(
    // process.env.CROSSFLOW_TESTNET_RPC,
    cosmoshub.rpc,
    wallet,
    { registry }
  );
  const { address } = (await wallet.getAccounts())[0];

  return {
    signAndBroadcast: (
      msgs: EncodeObject[],
      { fee, memo }: SignAndBroadcastOptions = { fee: defaultFee, memo: "" }
    ) => client.signAndBroadcast(address, msgs, fee, memo),
    msgVote: (data: MsgVote): EncodeObject => ({
      typeUrl: "/cosmos.vote.v1.MsgVote",
      value: MsgVote.fromPartial(data),
    }),
  };
};