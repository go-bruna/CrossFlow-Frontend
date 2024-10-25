// @ts-nocheck
import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgVoteSupplyHashObserve } from "./types/cfprotocol/lock/tx";
import { QueryGetSupplyTssObservationRequest } from "./types/cfprotocol/lock/query";
import { MsgObserveVoteLocking } from "./types/cfprotocol/lock/tx";
import { MsgHtlcReclaim } from "./types/cfprotocol/lock/tx";
import { SupplyTssObservation } from "./types/cfprotocol/lock/supply_tss_observation";
import { MsgObserveVoteLockingResponse } from "./types/cfprotocol/lock/tx";
import { MsgRequestSupplyResponse } from "./types/cfprotocol/lock/tx";
import { QueryAllAssetLockTransactionRequest } from "./types/cfprotocol/lock/query";
import { QueryGetAvailableLockTransactionRequest } from "./types/cfprotocol/lock/query";
import { GetLockBalanceResponse } from "./types/cfprotocol/lock/query";
import { QueryGetSupplyTssObservationResponse } from "./types/cfprotocol/lock/query";
import { Balance } from "./types/cfprotocol/lock/lock_balance";
import { ObserveVoteLockingAllResponse } from "./types/cfprotocol/lock/query";
import { QueryAllSupplyHashObservationResponse } from "./types/cfprotocol/lock/query";
import { MsgVoteSupplyTransactionResponse } from "./types/cfprotocol/lock/tx";
import { ObserveVoteLockingResponse } from "./types/cfprotocol/lock/query";
import { LockBalanceAllRequest } from "./types/cfprotocol/lock/query";
import { QueryGetSupplyHashObservationResponse } from "./types/cfprotocol/lock/query";
import { QueryAssetLockTransactionRequest } from "./types/cfprotocol/lock/query";
import { QueryGetSupplyTransactionRequest } from "./types/cfprotocol/lock/query";
import { QueryAllSupplyTssObservationRequest } from "./types/cfprotocol/lock/query";
import { QueryGetSupplyHashObservationRequest } from "./types/cfprotocol/lock/query";
import { MsgVoteSupplyHashObserveResponse } from "./types/cfprotocol/lock/tx";
import { QueryAllSupplyHashObservationRequest } from "./types/cfprotocol/lock/query";
import { SupplyHashObservation } from "./types/cfprotocol/lock/supply_hash_observation";
import { MsgVoteSupplyTransaction } from "./types/cfprotocol/lock/tx";
import { LockBalanceAllResponse } from "./types/cfprotocol/lock/query";
import { GenesisState } from "./types/cfprotocol/lock/genesis";
import { MsgUpdateParamsResponse } from "./types/cfprotocol/lock/tx";
import { QueryGetObserveVoteLockingRequest } from "./types/cfprotocol/lock/query";
import { QueryAllSupplyTransactionRequest } from "./types/cfprotocol/lock/query";
import { QueryAllSupplyTransactionResponse } from "./types/cfprotocol/lock/query";
import { MsgRequestLock } from "./types/cfprotocol/lock/tx";
import { QueryAssetLockTransactionAllResponse } from "./types/cfprotocol/lock/query";
import { ObserveVoteLocking } from "./types/cfprotocol/lock/observe_vote_locking";
import { AssetLockTransaction } from "./types/cfprotocol/lock/asset_lock_transaction";
import { QueryAssetLockTransactionResponse } from "./types/cfprotocol/lock/query";
import { QueryAllObserveVoteLockingRequest } from "./types/cfprotocol/lock/query";
import { MsgRequestLockResponse } from "./types/cfprotocol/lock/tx";
import { MsgHtlcReclaimResponse } from "./types/cfprotocol/lock/tx";
import { QueryParamsResponse } from "./types/cfprotocol/lock/query";
import { QueryGetSupplyTransactionResponse } from "./types/cfprotocol/lock/query";
import { QueryAllSupplyTssObservationResponse } from "./types/cfprotocol/lock/query";
import { MsgUpdateParams } from "./types/cfprotocol/lock/tx";
import { LockBalance } from "./types/cfprotocol/lock/lock_balance";
import { Params } from "./types/cfprotocol/lock/params";
import { QueryParamsRequest } from "./types/cfprotocol/lock/query";
import { QueryGetAvailableLockTransactionResponse } from "./types/cfprotocol/lock/query";
import { MsgRequestSupply } from "./types/cfprotocol/lock/tx";
import { GetLockBalanceRequest } from "./types/cfprotocol/lock/query";
import { SupplyTransaction } from "./types/cfprotocol/lock/supply_transaction";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/cfprotocol.lock.MsgVoteSupplyHashObserve", MsgVoteSupplyHashObserve],
    ["/cfprotocol.lock.QueryGetSupplyTssObservationRequest", QueryGetSupplyTssObservationRequest],
    ["/cfprotocol.lock.MsgObserveVoteLocking", MsgObserveVoteLocking],
    ["/cfprotocol.lock.MsgHtlcReclaim", MsgHtlcReclaim],
    ["/cfprotocol.lock.SupplyTssObservation", SupplyTssObservation],
    ["/cfprotocol.lock.MsgObserveVoteLockingResponse", MsgObserveVoteLockingResponse],
    ["/cfprotocol.lock.MsgRequestSupplyResponse", MsgRequestSupplyResponse],
    ["/cfprotocol.lock.QueryAllAssetLockTransactionRequest", QueryAllAssetLockTransactionRequest],
    ["/cfprotocol.lock.QueryGetAvailableLockTransactionRequest", QueryGetAvailableLockTransactionRequest],
    ["/cfprotocol.lock.GetLockBalanceResponse", GetLockBalanceResponse],
    ["/cfprotocol.lock.QueryGetSupplyTssObservationResponse", QueryGetSupplyTssObservationResponse],
    ["/cfprotocol.lock.Balance", Balance],
    ["/cfprotocol.lock.ObserveVoteLockingAllResponse", ObserveVoteLockingAllResponse],
    ["/cfprotocol.lock.QueryAllSupplyHashObservationResponse", QueryAllSupplyHashObservationResponse],
    ["/cfprotocol.lock.MsgVoteSupplyTransactionResponse", MsgVoteSupplyTransactionResponse],
    ["/cfprotocol.lock.ObserveVoteLockingResponse", ObserveVoteLockingResponse],
    ["/cfprotocol.lock.LockBalanceAllRequest", LockBalanceAllRequest],
    ["/cfprotocol.lock.QueryGetSupplyHashObservationResponse", QueryGetSupplyHashObservationResponse],
    ["/cfprotocol.lock.QueryAssetLockTransactionRequest", QueryAssetLockTransactionRequest],
    ["/cfprotocol.lock.QueryGetSupplyTransactionRequest", QueryGetSupplyTransactionRequest],
    ["/cfprotocol.lock.QueryAllSupplyTssObservationRequest", QueryAllSupplyTssObservationRequest],
    ["/cfprotocol.lock.QueryGetSupplyHashObservationRequest", QueryGetSupplyHashObservationRequest],
    ["/cfprotocol.lock.MsgVoteSupplyHashObserveResponse", MsgVoteSupplyHashObserveResponse],
    ["/cfprotocol.lock.QueryAllSupplyHashObservationRequest", QueryAllSupplyHashObservationRequest],
    ["/cfprotocol.lock.SupplyHashObservation", SupplyHashObservation],
    ["/cfprotocol.lock.MsgVoteSupplyTransaction", MsgVoteSupplyTransaction],
    ["/cfprotocol.lock.LockBalanceAllResponse", LockBalanceAllResponse],
    ["/cfprotocol.lock.GenesisState", GenesisState],
    ["/cfprotocol.lock.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/cfprotocol.lock.QueryGetObserveVoteLockingRequest", QueryGetObserveVoteLockingRequest],
    ["/cfprotocol.lock.QueryAllSupplyTransactionRequest", QueryAllSupplyTransactionRequest],
    ["/cfprotocol.lock.QueryAllSupplyTransactionResponse", QueryAllSupplyTransactionResponse],
    ["/cfprotocol.lock.MsgRequestLock", MsgRequestLock],
    ["/cfprotocol.lock.QueryAssetLockTransactionAllResponse", QueryAssetLockTransactionAllResponse],
    ["/cfprotocol.lock.ObserveVoteLocking", ObserveVoteLocking],
    ["/cfprotocol.lock.AssetLockTransaction", AssetLockTransaction],
    ["/cfprotocol.lock.QueryAssetLockTransactionResponse", QueryAssetLockTransactionResponse],
    ["/cfprotocol.lock.QueryAllObserveVoteLockingRequest", QueryAllObserveVoteLockingRequest],
    ["/cfprotocol.lock.MsgRequestLockResponse", MsgRequestLockResponse],
    ["/cfprotocol.lock.MsgHtlcReclaimResponse", MsgHtlcReclaimResponse],
    ["/cfprotocol.lock.QueryParamsResponse", QueryParamsResponse],
    ["/cfprotocol.lock.QueryGetSupplyTransactionResponse", QueryGetSupplyTransactionResponse],
    ["/cfprotocol.lock.QueryAllSupplyTssObservationResponse", QueryAllSupplyTssObservationResponse],
    ["/cfprotocol.lock.MsgUpdateParams", MsgUpdateParams],
    ["/cfprotocol.lock.LockBalance", LockBalance],
    ["/cfprotocol.lock.Params", Params],
    ["/cfprotocol.lock.QueryParamsRequest", QueryParamsRequest],
    ["/cfprotocol.lock.QueryGetAvailableLockTransactionResponse", QueryGetAvailableLockTransactionResponse],
    ["/cfprotocol.lock.MsgRequestSupply", MsgRequestSupply],
    ["/cfprotocol.lock.GetLockBalanceRequest", GetLockBalanceRequest],
    ["/cfprotocol.lock.SupplyTransaction", SupplyTransaction],
    
];

export { msgTypes }