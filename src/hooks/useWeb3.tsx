import { useCallback } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { type DecodedError, ErrorDecoder } from "ethers-decode-error";
import { useEthersProvider, useEthersSigner } from "@/utils/ethersAdapter";
import {
  CHAIN_ID,
  O_USDT_TOKEN,
} from "@/constants";
import { useToast } from "./useToast";
import { toWei } from "@/utils";
import { useTxModalState } from "@/contexts/tx-modal";
import { WARNING_MESSAGE } from "@/constants/message";
import { MODAL_STATE } from "@/types/interfaces";

export const useSigningWeb3Client = () => {
  const { address } = useAccount();
  const provider = useEthersProvider({ chainId: CHAIN_ID });

  const signer = useEthersSigner({ chainId: CHAIN_ID });
  const { messageApi } = useToast();
  const { setIsTxModal, updateModalState } = useTxModalState();
  const errorDecoder = ErrorDecoder.create();

  const approveUSDT = useCallback(async(amount: number) => {
    try {

      updateModalState(MODAL_STATE.APPROVE, "Approving", " ", "", 2);
      setIsTxModal(true);

      let contract = new ethers.Contract(
        O_USDT_TOKEN.address,
        O_USDT_TOKEN.abi,
        signer
      );

      const tokenAmount = amount.toString();
      const params: string[] = [O_USDT_TOKEN.address, toWei(tokenAmount)];

      let transaction = {
        from: address,
        to: O_USDT_TOKEN.address,
        data: contract.interface.encodeFunctionData("approve", params),
      };

      await provider?.estimateGas(transaction);
      let tx = await contract.approve(
        O_USDT_TOKEN.address,
        toWei(tokenAmount)
      );
      console.log("transaction of approve ==>", tx)
      await tx.wait();

      updateModalState(
        MODAL_STATE.CONFIRM,
        "Confirm",
        `${amount} USDT`,
        "",
        2
      );
      return true
    } catch (err) {
      console.log(err);
      const error: DecodedError = await errorDecoder.decode(err);
      messageApi.Alert({...WARNING_MESSAGE, content: error?.reason ?? undefined});
      return false
    }
  }, [provider, address]);

  return {
    approveUSDT
  }
};
