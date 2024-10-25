// @ts-nocheck
import { GeneratedType } from "@cosmjs/proto-signing";
import { Balance } from "./types/cfprotocol/chain/pool_balance";
import { MsgRemoveChain } from "./types/cfprotocol/chain/tx";
import { GenesisState } from "./types/cfprotocol/chain/genesis";
import { GovSummary } from "./types/cfprotocol/chain/gov_summary";
import { QueryParamsRequest } from "./types/cfprotocol/chain/query";
import { Chain } from "./types/cfprotocol/chain/chain";
import { MsgUpdateBalanceResponse } from "./types/cfprotocol/chain/tx";
import { Params } from "./types/cfprotocol/chain/params";
import { MsgUpdateNativeBalance } from "./types/cfprotocol/chain/tx";
import { QueryParamsResponse } from "./types/cfprotocol/chain/query";
import { QueryChainAllRequest } from "./types/cfprotocol/chain/query";
import { QueryBalanceObservationAllRequest } from "./types/cfprotocol/chain/query";
import { QueryGetStakeSummaryRequest } from "./types/cfprotocol/chain/query";
import { QueryGetStakeSummaryResponse } from "./types/cfprotocol/chain/query";
import { MsgAddChainResponse } from "./types/cfprotocol/chain/tx";
import { MsgRemoveTokenResponse } from "./types/cfprotocol/chain/tx";
import { MsgAddTokenResponse } from "./types/cfprotocol/chain/tx";
import { MsgAddToken } from "./types/cfprotocol/chain/tx";
import { QueryChainAllResponse } from "./types/cfprotocol/chain/query";
import { QueryPoolBalanceResponse } from "./types/cfprotocol/chain/query";
import { QueryBalanceObservationRequest } from "./types/cfprotocol/chain/query";
import { QueryBalanceObservationResponse } from "./types/cfprotocol/chain/query";
import { QueryPoolBalanceAllRequest } from "./types/cfprotocol/chain/query";
import { QueryPoolBalanceAllResponse } from "./types/cfprotocol/chain/query";
import { MsgUpdateNativeBalanceResponse } from "./types/cfprotocol/chain/tx";
import { MsgAddChain } from "./types/cfprotocol/chain/tx";
import { BalanceObservation } from "./types/cfprotocol/chain/balance_observation";
import { QueryPoolBalanceRequest } from "./types/cfprotocol/chain/query";
import { QueryBalanceObservationAllResponse } from "./types/cfprotocol/chain/query";
import { QueryGetGovSummaryRequest } from "./types/cfprotocol/chain/query";
import { MsgUpdateParams } from "./types/cfprotocol/chain/tx";
import { MsgUpdateParamsResponse } from "./types/cfprotocol/chain/tx";
import { MsgRemoveToken } from "./types/cfprotocol/chain/tx";
import { QueryChainRequest } from "./types/cfprotocol/chain/query";
import { QueryChainResponse } from "./types/cfprotocol/chain/query";
import { MsgUpdateBalance } from "./types/cfprotocol/chain/tx";
import { PoolBalance } from "./types/cfprotocol/chain/pool_balance";
import { QueryGetGovSummaryResponse } from "./types/cfprotocol/chain/query";
import { StakeSummary } from "./types/cfprotocol/chain/stake_summary";
import { MsgRemoveChainResponse } from "./types/cfprotocol/chain/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/cfprotocol.chain.Balance", Balance],
    ["/cfprotocol.chain.MsgRemoveChain", MsgRemoveChain],
    ["/cfprotocol.chain.GenesisState", GenesisState],
    ["/cfprotocol.chain.GovSummary", GovSummary],
    ["/cfprotocol.chain.QueryParamsRequest", QueryParamsRequest],
    ["/cfprotocol.chain.Chain", Chain],
    ["/cfprotocol.chain.MsgUpdateBalanceResponse", MsgUpdateBalanceResponse],
    ["/cfprotocol.chain.Params", Params],
    ["/cfprotocol.chain.MsgUpdateNativeBalance", MsgUpdateNativeBalance],
    ["/cfprotocol.chain.QueryParamsResponse", QueryParamsResponse],
    ["/cfprotocol.chain.QueryChainAllRequest", QueryChainAllRequest],
    ["/cfprotocol.chain.QueryBalanceObservationAllRequest", QueryBalanceObservationAllRequest],
    ["/cfprotocol.chain.QueryGetStakeSummaryRequest", QueryGetStakeSummaryRequest],
    ["/cfprotocol.chain.QueryGetStakeSummaryResponse", QueryGetStakeSummaryResponse],
    ["/cfprotocol.chain.MsgAddChainResponse", MsgAddChainResponse],
    ["/cfprotocol.chain.MsgRemoveTokenResponse", MsgRemoveTokenResponse],
    ["/cfprotocol.chain.MsgAddTokenResponse", MsgAddTokenResponse],
    ["/cfprotocol.chain.MsgAddToken", MsgAddToken],
    ["/cfprotocol.chain.QueryChainAllResponse", QueryChainAllResponse],
    ["/cfprotocol.chain.QueryPoolBalanceResponse", QueryPoolBalanceResponse],
    ["/cfprotocol.chain.QueryBalanceObservationRequest", QueryBalanceObservationRequest],
    ["/cfprotocol.chain.QueryBalanceObservationResponse", QueryBalanceObservationResponse],
    ["/cfprotocol.chain.QueryPoolBalanceAllRequest", QueryPoolBalanceAllRequest],
    ["/cfprotocol.chain.QueryPoolBalanceAllResponse", QueryPoolBalanceAllResponse],
    ["/cfprotocol.chain.MsgUpdateNativeBalanceResponse", MsgUpdateNativeBalanceResponse],
    ["/cfprotocol.chain.MsgAddChain", MsgAddChain],
    ["/cfprotocol.chain.BalanceObservation", BalanceObservation],
    ["/cfprotocol.chain.QueryPoolBalanceRequest", QueryPoolBalanceRequest],
    ["/cfprotocol.chain.QueryBalanceObservationAllResponse", QueryBalanceObservationAllResponse],
    ["/cfprotocol.chain.QueryGetGovSummaryRequest", QueryGetGovSummaryRequest],
    ["/cfprotocol.chain.MsgUpdateParams", MsgUpdateParams],
    ["/cfprotocol.chain.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/cfprotocol.chain.MsgRemoveToken", MsgRemoveToken],
    ["/cfprotocol.chain.QueryChainRequest", QueryChainRequest],
    ["/cfprotocol.chain.QueryChainResponse", QueryChainResponse],
    ["/cfprotocol.chain.MsgUpdateBalance", MsgUpdateBalance],
    ["/cfprotocol.chain.PoolBalance", PoolBalance],
    ["/cfprotocol.chain.QueryGetGovSummaryResponse", QueryGetGovSummaryResponse],
    ["/cfprotocol.chain.StakeSummary", StakeSummary],
    ["/cfprotocol.chain.MsgRemoveChainResponse", MsgRemoveChainResponse],
    
];

export { msgTypes }