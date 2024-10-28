// @ts-nocheck
import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgUpdateParamsResponse } from "./types/cfprotocol/asset/tx";
import { MsgCreateAssetProfile } from "./types/cfprotocol/asset/tx";
import { MsgUpdateAssetProfileResponse } from "./types/cfprotocol/asset/tx";
import { AssetProfile } from "./types/cfprotocol/asset/profile";
import { QueryAssetProfileRequest } from "./types/cfprotocol/asset/query";
import { MsgUpdateParams } from "./types/cfprotocol/asset/tx";
import { MsgCreateAssetProfileResponse } from "./types/cfprotocol/asset/tx";
import { MsgDeleteAssetProfile } from "./types/cfprotocol/asset/tx";
import { QueryParamsRequest } from "./types/cfprotocol/asset/query";
import { QueryParamsResponse } from "./types/cfprotocol/asset/query";
import { QueryAssetProfileResponse } from "./types/cfprotocol/asset/query";
import { QueryAssetProfileAllResponse } from "./types/cfprotocol/asset/query";
import { MsgUpdateAssetProfile } from "./types/cfprotocol/asset/tx";
import { MsgDeleteAssetProfileResponse } from "./types/cfprotocol/asset/tx";
import { GenesisState } from "./types/cfprotocol/asset/genesis";
import { Params } from "./types/cfprotocol/asset/params";
import { QueryAssetProfileAllRequest } from "./types/cfprotocol/asset/query";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/cfprotocol.asset.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/cfprotocol.asset.MsgCreateAssetProfile", MsgCreateAssetProfile],
    ["/cfprotocol.asset.MsgUpdateAssetProfileResponse", MsgUpdateAssetProfileResponse],
    ["/cfprotocol.asset.AssetProfile", AssetProfile],
    ["/cfprotocol.asset.QueryAssetProfileRequest", QueryAssetProfileRequest],
    ["/cfprotocol.asset.MsgUpdateParams", MsgUpdateParams],
    ["/cfprotocol.asset.MsgCreateAssetProfileResponse", MsgCreateAssetProfileResponse],
    ["/cfprotocol.asset.MsgDeleteAssetProfile", MsgDeleteAssetProfile],
    ["/cfprotocol.asset.QueryParamsRequest", QueryParamsRequest],
    ["/cfprotocol.asset.QueryParamsResponse", QueryParamsResponse],
    ["/cfprotocol.asset.QueryAssetProfileResponse", QueryAssetProfileResponse],
    ["/cfprotocol.asset.QueryAssetProfileAllResponse", QueryAssetProfileAllResponse],
    ["/cfprotocol.asset.MsgUpdateAssetProfile", MsgUpdateAssetProfile],
    ["/cfprotocol.asset.MsgDeleteAssetProfileResponse", MsgDeleteAssetProfileResponse],
    ["/cfprotocol.asset.GenesisState", GenesisState],
    ["/cfprotocol.asset.Params", Params],
    ["/cfprotocol.asset.QueryAssetProfileAllRequest", QueryAssetProfileAllRequest],
    
];

export { msgTypes }