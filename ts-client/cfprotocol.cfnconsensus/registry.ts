// @ts-nocheck
import { GeneratedType } from "@cosmjs/proto-signing";
import { Params } from "./types/cfprotocol/cfnconsensus/params";
import { MsgUpdateParamsResponse } from "./types/cfprotocol/cfnconsensus/tx";
import { ConsensusPayload } from "./types/cfprotocol/cfnconsensus/consensus_payload";
import { QueryParamsResponse } from "./types/cfprotocol/cfnconsensus/query";
import { QueryParamsRequest } from "./types/cfprotocol/cfnconsensus/query";
import { MsgUpdateParams } from "./types/cfprotocol/cfnconsensus/tx";
import { GenesisState } from "./types/cfprotocol/cfnconsensus/genesis";
import { Payload } from "./types/cfprotocol/cfnconsensus/consensus_payload";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/cfprotocol.cfnconsensus.Params", Params],
    ["/cfprotocol.cfnconsensus.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/cfprotocol.cfnconsensus.ConsensusPayload", ConsensusPayload],
    ["/cfprotocol.cfnconsensus.QueryParamsResponse", QueryParamsResponse],
    ["/cfprotocol.cfnconsensus.QueryParamsRequest", QueryParamsRequest],
    ["/cfprotocol.cfnconsensus.MsgUpdateParams", MsgUpdateParams],
    ["/cfprotocol.cfnconsensus.GenesisState", GenesisState],
    ["/cfprotocol.cfnconsensus.Payload", Payload],
    
];

export { msgTypes }