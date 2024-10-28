import { TxClient } from "@/cf-client/client";
import { MsgRequestTransaction } from "@src/cf-client/cosmos.gov/tx";
import { MsgVote } from "@/cf-client/cosmos.gov/tx";
import { VoteOption } from "@/cf-client/cosmos.gov/gov";
import { toast } from "react-toastify";
import React, {
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface ICrossflowProviderConext {
  connect(): void;
  disconnect(): void;
  sendVote(): void;
  chainId: number | undefined;
  errorMessage: string | undefined;
  cfnAddress: string | undefined;
  cfnSignerClient: any;
}

const CFNProviderContext = React.createContext<ICrossflowProviderConext>({
  connect: () => {},
  disconnect: () => {},
  sendVote: () => {},
  chainId: undefined,
  cfnAddress: undefined,
  errorMessage: undefined,
  cfnSignerClient: null,
});

export const CFNProvider = ({ children }: { children: ReactNode }) => {
  const [chainId, setChainId] = useState<number | undefined>(undefined);
  const [cfnAddress, setWalletAddress] = useState<string | undefined>(
    undefined
  );
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [cfnSignerClient, setWalletClient] = useState<any>(undefined);

  // Button handler button for handling a request window event for Keplr.
  const connect = useCallback(async () => {
    if (window.keplr) {
      if (!window.getOfflineSigner || !window.keplr) {
        setErrorMessage("Please install keplr extension");
      } else {
        if (window.keplr.experimentalSuggestChain) {
          try {
            await window.keplr.experimentalSuggestChain({
              // Chain-id of the Cosmos SDK chain.
              chainId: "crossflow_testnet-1",
              // The name of the chain to be displayed to the user.
              chainName: "CFN Testnet",
              // RPC endpoint of the chain.
              rpc: "https://restnet-rpc.crossflow.network",
              // REST endpoint of the chain.
              rest: "https://restnet-api.crossflow.network",
              // Staking coin information
              stakeCurrency: {
                // Coin denomination to be displayed to the user.
                coinDenom: "CFN",
                // Actual denom (i.e. uatom, uscrt) used by the blockchain.
                coinMinimalDenom: "uCFN",
                // # of decimal points to convert minimal denomination to user-facing denomination.
                coinDecimals: 6,
                // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
                // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
                // coinGeckoId: ""
              },
              bip44: {
                // You can only set the coin type of BIP44.
                // 'Purpose' is fixed to 44.
                coinType: 118,
              },
              bech32Config: {
                bech32PrefixAccAddr: "cfn",
                bech32PrefixAccPub: "cfnpub",
                bech32PrefixValAddr: "cfnvaloper",
                bech32PrefixValPub: "cfnvaloperpub",
                bech32PrefixConsAddr: "cfnvalcons",
                bech32PrefixConsPub: "cfnvalconspub",
              },
              // List of all coin/tokens used in this chain.
              currencies: [
                {
                  // Coin denomination to be displayed to the user.
                  coinDenom: "CFN",
                  // Actual denom (i.e. uatom, uscrt) used by the blockchain.
                  coinMinimalDenom: "uCFN",
                  // # of decimal points to convert minimal denomination to user-facing denomination.
                  coinDecimals: 6,
                  // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
                  // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
                  // coinGeckoId: ""
                },
              ],
              // List of coin/tokens used as a fee token in this chain.
              feeCurrencies: [
                {
                  // Coin denomination to be displayed to the user.
                  coinDenom: "CFN",
                  // Actual denom (i.e. uatom, uscrt) used by the blockchain.
                  coinMinimalDenom: "uCFN",
                  // # of decimal points to convert minimal denomination to user-facing denomination.
                  coinDecimals: 6,
                  // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
                  // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
                  // coinGeckoId: ""
                },
              ],
              // (Optional) This is used to set the fee of the transaction.
              // If this field is not provided, Keplr extension will set the default gas price as (low: 0.01, average: 0.025, high: 0.04).
              // Currently, Keplr doesn't support dynamic calculation of the gas prices based on on-chain data.
              // Make sure that the gas prices are higher than the minimum gas prices accepted by chain validators and RPC/REST endpoint.
              // gasPriceStep: {
              //   low: 0.01,
              //   average: 0.025,
              //   high: 0.04,
              // },
            });
          } catch {
            setErrorMessage("Failed to suggest the chain");
          }
        } else {
          setErrorMessage("Please use the recent version of keplr extension");
        }
      }

      const chainId = "crossflow_testnet-1";
      // Unlock the wallet.
      await window.keplr.enable(chainId);

      // Use offlineSigner to get first wallet and public key.
      // Currently only first address is supported.
      const offlineSigner = await window.keplr.getOfflineSigner(chainId);
      const keplrAccounts = await offlineSigner.getAccounts();

      // Set state value as first address.
      setWalletAddress(keplrAccounts[0].address);
      // const bytesToBase64 = (bytes) => {
      //   const binString = String.fromCodePoint(...bytes);
      //   return btoa(binString);
      // };
      // console.log(keplrAccounts[0].pubkey);
      // console.log(bytesToBase64(keplrAccounts[0].pubkey));
      setWalletClient(offlineSigner);
    } else {
      setErrorMessage("Keplr extension is not installed.");
    }
  }, []);

  const disconnect = useCallback(() => {
    setWalletAddress(undefined);
    setWalletClient(null);
  }, []);

  const sendVote = useCallback(async () => {
    try {
      const client = await TxClient(cfnSignerClient);
      const [firstAccount] = await cfnSignerClient.getAccounts();
      // TODO:
      // Set valid data from parameter
      const params: MsgVote = {
        /** proposal_id defines the unique id of the proposal. */
        proposalId: number,
        /** voter is the voter address for the proposal. */
        voter: firstAccount.address,
        /** option defines the vote option. */
        option: VoteOption,
        /** metadata is any arbitrary metadata attached to the Vote. */
        metadata: "metadata"
      };

      let msg = await client.msgVote(params);
      const result = await client.signAndBroadcast([msg]);
      console.log(result);
    } catch (e) {
      console.log(e);
      toast(e);
    }
  }, [cfnSignerClient]);

  const contextValue = useMemo(
    () => ({
      connect,
      disconnect,
      sendVote,
      errorMessage,
      chainId,
      cfnAddress,
      cfnSignerClient,
    }),
    [
      connect,
      disconnect,
      sendVote,
      errorMessage,
      chainId,
      cfnAddress,
      cfnSignerClient,
    ]
  );
  
  return (
    <CFNProviderContext.Provider value={contextValue}>
      {children}
    </CFNProviderContext.Provider>
  );
};

export const useCFNProvider = () => {
  return useContext(CFNProviderContext);
};
