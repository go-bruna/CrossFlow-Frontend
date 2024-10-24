export const cosmoshub = {
  chainId: "crossflow_testnet-1",
  // The name of the chain to be displayed to the user.
  chainName: "Crossflow Testnet",
  // RPC endpoint of the chain.
  rpc: "https://testnet-rpc.crossflow.network",
  // grpc: "https://testnet-grpc.crossflow.network/",
  // REST endpoint of the chain.
  rest: "https://testnet-api.crossflow.network",
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
    bech32PrefixConsPub: "cfnvalconspub"
  },
  // List of all coin/tokens used in this chain.
  currencies: [{
    // Coin denomination to be displayed to the user.
    coinDenom: "CFN",
    // Actual denom (i.e. uatom, uscrt) used by the blockchain.
    coinMinimalDenom: "uCFN",
    // # of decimal points to convert minimal denomination to user-facing denomination.
    coinDecimals: 6,
    // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
    // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
    // coinGeckoId: ""
  }],
  // List of coin/tokens used as a fee token in this chain.
  feeCurrencies: [{
    // Coin denomination to be displayed to the user.
    coinDenom: "CFN",
    // Actual denom (i.e. uatom, uscrt) used by the blockchain.
    coinMinimalDenom: "uCFN",
    // # of decimal points to convert minimal denomination to user-facing denomination.
    coinDecimals: 6,
    // (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
    // You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
    // coinGeckoId: ""
  }],
  // (Optional) This is used to set the fee of the transaction.
  // If this field is not provided, Keplr extension will set the default gas price as (low: 0.01, average: 0.025, high: 0.04).
  // Currently, Keplr doesn't support dynamic calculation of the gas prices based on on-chain data.
  // Make sure that the gas prices are higher than the minimum gas prices accepted by chain validators and RPC/REST endpoint.

  // gasPriceStep: {
  //   low: 0.01,
  //   average: 0.025,
  //   high: 0.04
  // }
}
