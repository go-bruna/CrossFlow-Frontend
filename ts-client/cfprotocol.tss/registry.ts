// @ts-nocheck
import { GeneratedType } from "@cosmjs/proto-signing";
import { QueryPubkeyRequest } from "./types/cfprotocol/tss/query";
import { QueryListAllNewPubkeyRequest } from "./types/cfprotocol/tss/query";
import { QueryTssPubkeyResponse } from "./types/cfprotocol/tss/query";
import { MsgUpdateParamsResponse } from "./types/cfprotocol/tss/tx";
import { MsgUpdateTssPubkeyResponse } from "./types/cfprotocol/tss/tx";
import { QueryListAllNewPubkeyResponse } from "./types/cfprotocol/tss/query";
import { KeygenBlock } from "./types/cfprotocol/tss/type_keygen";
import { MsgUpdatePubkey } from "./types/cfprotocol/tss/tx";
import { QueryPubkeyResponse } from "./types/cfprotocol/tss/query";
import { QueryAllTssPubkeyRequest } from "./types/cfprotocol/tss/query";
import { MsgUpdateParams } from "./types/cfprotocol/tss/tx";
import { TssPubkey } from "./types/cfprotocol/tss/tss_pubkey";
import { QueryParamsRequest } from "./types/cfprotocol/tss/query";
import { QueryTssPubkeyRequest } from "./types/cfprotocol/tss/query";
import { QueryTssPubkeyAllResponse } from "./types/cfprotocol/tss/query";
import { Params } from "./types/cfprotocol/tss/params";
import { MsgUpdatePubkeyResponse } from "./types/cfprotocol/tss/tx";
import { MsgAddPubkeyResponse } from "./types/cfprotocol/tss/tx";
import { QueryPubkeyAllResponse } from "./types/cfprotocol/tss/query";
import { QueryAllPubkeyRequest } from "./types/cfprotocol/tss/query";
import { QueryKeygenBlockRequest } from "./types/cfprotocol/tss/query";
import { MsgAddPubkey } from "./types/cfprotocol/tss/tx";
import { Pubkey } from "./types/cfprotocol/tss/pubkey";
import { QueryParamsResponse } from "./types/cfprotocol/tss/query";
import { Keygen } from "./types/cfprotocol/tss/type_keygen";
import { GenesisState } from "./types/cfprotocol/tss/genesis";
import { MsgUpdateTssPubkey } from "./types/cfprotocol/tss/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/cfprotocol.tss.QueryPubkeyRequest", QueryPubkeyRequest],
    ["/cfprotocol.tss.QueryListAllNewPubkeyRequest", QueryListAllNewPubkeyRequest],
    ["/cfprotocol.tss.QueryTssPubkeyResponse", QueryTssPubkeyResponse],
    ["/cfprotocol.tss.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/cfprotocol.tss.MsgUpdateTssPubkeyResponse", MsgUpdateTssPubkeyResponse],
    ["/cfprotocol.tss.QueryListAllNewPubkeyResponse", QueryListAllNewPubkeyResponse],
    ["/cfprotocol.tss.KeygenBlock", KeygenBlock],
    ["/cfprotocol.tss.MsgUpdatePubkey", MsgUpdatePubkey],
    ["/cfprotocol.tss.QueryPubkeyResponse", QueryPubkeyResponse],
    ["/cfprotocol.tss.QueryAllTssPubkeyRequest", QueryAllTssPubkeyRequest],
    ["/cfprotocol.tss.MsgUpdateParams", MsgUpdateParams],
    ["/cfprotocol.tss.TssPubkey", TssPubkey],
    ["/cfprotocol.tss.QueryParamsRequest", QueryParamsRequest],
    ["/cfprotocol.tss.QueryTssPubkeyRequest", QueryTssPubkeyRequest],
    ["/cfprotocol.tss.QueryTssPubkeyAllResponse", QueryTssPubkeyAllResponse],
    ["/cfprotocol.tss.Params", Params],
    ["/cfprotocol.tss.MsgUpdatePubkeyResponse", MsgUpdatePubkeyResponse],
    ["/cfprotocol.tss.MsgAddPubkeyResponse", MsgAddPubkeyResponse],
    ["/cfprotocol.tss.QueryPubkeyAllResponse", QueryPubkeyAllResponse],
    ["/cfprotocol.tss.QueryAllPubkeyRequest", QueryAllPubkeyRequest],
    ["/cfprotocol.tss.QueryKeygenBlockRequest", QueryKeygenBlockRequest],
    ["/cfprotocol.tss.MsgAddPubkey", MsgAddPubkey],
    ["/cfprotocol.tss.Pubkey", Pubkey],
    ["/cfprotocol.tss.QueryParamsResponse", QueryParamsResponse],
    ["/cfprotocol.tss.Keygen", Keygen],
    ["/cfprotocol.tss.GenesisState", GenesisState],
    ["/cfprotocol.tss.MsgUpdateTssPubkey", MsgUpdateTssPubkey],
    
];

export { msgTypes }