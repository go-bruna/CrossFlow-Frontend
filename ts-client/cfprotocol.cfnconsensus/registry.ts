// @ts-nocheck
import { GeneratedType } from "@cosmjs/proto-signing";
import { Params } from "./types/cfprotocol/cfnconsensus/params";
import { ConsensusPayload } from "./types/cfprotocol/cfnconsensus/consensus_payload";
import { GenesisState } from "./types/cfprotocol/cfnconsensus/genesis";
import { QueryParamsRequest } from "./types/cfprotocol/cfnconsensus/query";
import { QueryParamsResponse } from "./types/cfprotocol/cfnconsensus/query";
import { MsgUpdateParams } from "./types/cfprotocol/cfnconsensus/tx";
import { MsgUpdateParamsResponse } from "./types/cfprotocol/cfnconsensus/tx";
import { Payload } from "./types/cfprotocol/cfnconsensus/consensus_payload";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/cfprotocol.cfnconsensus.Params", Params],
    ["/cfprotocol.cfnconsensus.ConsensusPayload", ConsensusPayload],
    ["/cfprotocol.cfnconsensus.GenesisState", GenesisState],
    ["/cfprotocol.cfnconsensus.QueryParamsRequest", QueryParamsRequest],
    ["/cfprotocol.cfnconsensus.QueryParamsResponse", QueryParamsResponse],
    ["/cfprotocol.cfnconsensus.MsgUpdateParams", MsgUpdateParams],
    ["/cfprotocol.cfnconsensus.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/cfprotocol.cfnconsensus.Payload", Payload],
    
];

export { msgTypes }