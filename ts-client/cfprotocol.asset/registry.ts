// @ts-nocheck
import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgUpdateParams } from "./types/cfprotocol/asset/tx";
import { MsgUpdateParamsResponse } from "./types/cfprotocol/asset/tx";
import { MsgCreateAssetProfileResponse } from "./types/cfprotocol/asset/tx";
import { MsgUpdateAssetProfileResponse } from "./types/cfprotocol/asset/tx";
import { MsgDeleteAssetProfileResponse } from "./types/cfprotocol/asset/tx";
import { QueryParamsRequest } from "./types/cfprotocol/asset/query";
import { QueryParamsResponse } from "./types/cfprotocol/asset/query";
import { MsgDeleteAssetProfile } from "./types/cfprotocol/asset/tx";
import { AssetProfile } from "./types/cfprotocol/asset/profile";
import { MsgCreateAssetProfile } from "./types/cfprotocol/asset/tx";
import { MsgUpdateAssetProfile } from "./types/cfprotocol/asset/tx";
import { GenesisState } from "./types/cfprotocol/asset/genesis";
import { QueryAssetProfileAllRequest } from "./types/cfprotocol/asset/query";
import { QueryAssetProfileAllResponse } from "./types/cfprotocol/asset/query";
import { Params } from "./types/cfprotocol/asset/params";
import { QueryAssetProfileRequest } from "./types/cfprotocol/asset/query";
import { QueryAssetProfileResponse } from "./types/cfprotocol/asset/query";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/cfprotocol.asset.MsgUpdateParams", MsgUpdateParams],
    ["/cfprotocol.asset.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/cfprotocol.asset.MsgCreateAssetProfileResponse", MsgCreateAssetProfileResponse],
    ["/cfprotocol.asset.MsgUpdateAssetProfileResponse", MsgUpdateAssetProfileResponse],
    ["/cfprotocol.asset.MsgDeleteAssetProfileResponse", MsgDeleteAssetProfileResponse],
    ["/cfprotocol.asset.QueryParamsRequest", QueryParamsRequest],
    ["/cfprotocol.asset.QueryParamsResponse", QueryParamsResponse],
    ["/cfprotocol.asset.MsgDeleteAssetProfile", MsgDeleteAssetProfile],
    ["/cfprotocol.asset.AssetProfile", AssetProfile],
    ["/cfprotocol.asset.MsgCreateAssetProfile", MsgCreateAssetProfile],
    ["/cfprotocol.asset.MsgUpdateAssetProfile", MsgUpdateAssetProfile],
    ["/cfprotocol.asset.GenesisState", GenesisState],
    ["/cfprotocol.asset.QueryAssetProfileAllRequest", QueryAssetProfileAllRequest],
    ["/cfprotocol.asset.QueryAssetProfileAllResponse", QueryAssetProfileAllResponse],
    ["/cfprotocol.asset.Params", Params],
    ["/cfprotocol.asset.QueryAssetProfileRequest", QueryAssetProfileRequest],
    ["/cfprotocol.asset.QueryAssetProfileResponse", QueryAssetProfileResponse],
    
];

export { msgTypes }