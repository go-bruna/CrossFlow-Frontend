// @ts-nocheck
import { GeneratedType } from "@cosmjs/proto-signing";
import { QueryParamsRequest } from "./types/cfprotocol/reward/query";
import { Params } from "./types/cfprotocol/reward/params";
import { GenesisState } from "./types/cfprotocol/reward/genesis";
import { QueryParamsResponse } from "./types/cfprotocol/reward/query";
import { MsgUpdateParamsResponse } from "./types/cfprotocol/reward/tx";
import { MsgUpdateParams } from "./types/cfprotocol/reward/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/cfprotocol.reward.QueryParamsRequest", QueryParamsRequest],
    ["/cfprotocol.reward.Params", Params],
    ["/cfprotocol.reward.GenesisState", GenesisState],
    ["/cfprotocol.reward.QueryParamsResponse", QueryParamsResponse],
    ["/cfprotocol.reward.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/cfprotocol.reward.MsgUpdateParams", MsgUpdateParams],
    
];

export { msgTypes }