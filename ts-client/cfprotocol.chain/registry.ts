// @ts-nocheck
import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgAddChain } from "./types/cfprotocol/chain/tx";
import { StakeSummary } from "./types/cfprotocol/chain/stake_summary";
import { Balance } from "./types/cfprotocol/chain/pool_balance";
import { PoolBalance } from "./types/cfprotocol/chain/pool_balance";
import { MsgRemoveTokenResponse } from "./types/cfprotocol/chain/tx";
import { GovSummary } from "./types/cfprotocol/chain/gov_summary";
import { QueryParamsRequest } from "./types/cfprotocol/chain/query";
import { MsgUpdateParams } from "./types/cfprotocol/chain/tx";
import { MsgUpdateParamsResponse } from "./types/cfprotocol/chain/tx";
import { QueryParamsResponse } from "./types/cfprotocol/chain/query";
import { QueryChainResponse } from "./types/cfprotocol/chain/query";
import { QueryPoolBalanceAllRequest } from "./types/cfprotocol/chain/query";
import { BalanceObservation } from "./types/cfprotocol/chain/balance_observation";
import { MsgUpdateBalanceResponse } from "./types/cfprotocol/chain/tx";
import { MsgRemoveChain } from "./types/cfprotocol/chain/tx";
import { QueryChainRequest } from "./types/cfprotocol/chain/query";
import { QueryBalanceObservationRequest } from "./types/cfprotocol/chain/query";
import { QueryGetStakeSummaryResponse } from "./types/cfprotocol/chain/query";
import { QueryGetGovSummaryResponse } from "./types/cfprotocol/chain/query";
import { MsgUpdateBalance } from "./types/cfprotocol/chain/tx";
import { QueryChainAllResponse } from "./types/cfprotocol/chain/query";
import { QueryPoolBalanceResponse } from "./types/cfprotocol/chain/query";
import { QueryPoolBalanceAllResponse } from "./types/cfprotocol/chain/query";
import { QueryBalanceObservationAllRequest } from "./types/cfprotocol/chain/query";
import { Params } from "./types/cfprotocol/chain/params";
import { Chain } from "./types/cfprotocol/chain/chain";
import { MsgUpdateNativeBalanceResponse } from "./types/cfprotocol/chain/tx";
import { MsgRemoveToken } from "./types/cfprotocol/chain/tx";
import { QueryChainAllRequest } from "./types/cfprotocol/chain/query";
import { QueryPoolBalanceRequest } from "./types/cfprotocol/chain/query";
import { QueryBalanceObservationResponse } from "./types/cfprotocol/chain/query";
import { QueryBalanceObservationAllResponse } from "./types/cfprotocol/chain/query";
import { MsgAddToken } from "./types/cfprotocol/chain/tx";
import { MsgAddTokenResponse } from "./types/cfprotocol/chain/tx";
import { QueryGetGovSummaryRequest } from "./types/cfprotocol/chain/query";
import { MsgAddChainResponse } from "./types/cfprotocol/chain/tx";
import { MsgRemoveChainResponse } from "./types/cfprotocol/chain/tx";
import { MsgUpdateNativeBalance } from "./types/cfprotocol/chain/tx";
import { QueryGetStakeSummaryRequest } from "./types/cfprotocol/chain/query";
import { GenesisState } from "./types/cfprotocol/chain/genesis";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/cfprotocol.chain.MsgAddChain", MsgAddChain],
    ["/cfprotocol.chain.StakeSummary", StakeSummary],
    ["/cfprotocol.chain.Balance", Balance],
    ["/cfprotocol.chain.PoolBalance", PoolBalance],
    ["/cfprotocol.chain.MsgRemoveTokenResponse", MsgRemoveTokenResponse],
    ["/cfprotocol.chain.GovSummary", GovSummary],
    ["/cfprotocol.chain.QueryParamsRequest", QueryParamsRequest],
    ["/cfprotocol.chain.MsgUpdateParams", MsgUpdateParams],
    ["/cfprotocol.chain.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/cfprotocol.chain.QueryParamsResponse", QueryParamsResponse],
    ["/cfprotocol.chain.QueryChainResponse", QueryChainResponse],
    ["/cfprotocol.chain.QueryPoolBalanceAllRequest", QueryPoolBalanceAllRequest],
    ["/cfprotocol.chain.BalanceObservation", BalanceObservation],
    ["/cfprotocol.chain.MsgUpdateBalanceResponse", MsgUpdateBalanceResponse],
    ["/cfprotocol.chain.MsgRemoveChain", MsgRemoveChain],
    ["/cfprotocol.chain.QueryChainRequest", QueryChainRequest],
    ["/cfprotocol.chain.QueryBalanceObservationRequest", QueryBalanceObservationRequest],
    ["/cfprotocol.chain.QueryGetStakeSummaryResponse", QueryGetStakeSummaryResponse],
    ["/cfprotocol.chain.QueryGetGovSummaryResponse", QueryGetGovSummaryResponse],
    ["/cfprotocol.chain.MsgUpdateBalance", MsgUpdateBalance],
    ["/cfprotocol.chain.QueryChainAllResponse", QueryChainAllResponse],
    ["/cfprotocol.chain.QueryPoolBalanceResponse", QueryPoolBalanceResponse],
    ["/cfprotocol.chain.QueryPoolBalanceAllResponse", QueryPoolBalanceAllResponse],
    ["/cfprotocol.chain.QueryBalanceObservationAllRequest", QueryBalanceObservationAllRequest],
    ["/cfprotocol.chain.Params", Params],
    ["/cfprotocol.chain.Chain", Chain],
    ["/cfprotocol.chain.MsgUpdateNativeBalanceResponse", MsgUpdateNativeBalanceResponse],
    ["/cfprotocol.chain.MsgRemoveToken", MsgRemoveToken],
    ["/cfprotocol.chain.QueryChainAllRequest", QueryChainAllRequest],
    ["/cfprotocol.chain.QueryPoolBalanceRequest", QueryPoolBalanceRequest],
    ["/cfprotocol.chain.QueryBalanceObservationResponse", QueryBalanceObservationResponse],
    ["/cfprotocol.chain.QueryBalanceObservationAllResponse", QueryBalanceObservationAllResponse],
    ["/cfprotocol.chain.MsgAddToken", MsgAddToken],
    ["/cfprotocol.chain.MsgAddTokenResponse", MsgAddTokenResponse],
    ["/cfprotocol.chain.QueryGetGovSummaryRequest", QueryGetGovSummaryRequest],
    ["/cfprotocol.chain.MsgAddChainResponse", MsgAddChainResponse],
    ["/cfprotocol.chain.MsgRemoveChainResponse", MsgRemoveChainResponse],
    ["/cfprotocol.chain.MsgUpdateNativeBalance", MsgUpdateNativeBalance],
    ["/cfprotocol.chain.QueryGetStakeSummaryRequest", QueryGetStakeSummaryRequest],
    ["/cfprotocol.chain.GenesisState", GenesisState],
    
];

export { msgTypes }