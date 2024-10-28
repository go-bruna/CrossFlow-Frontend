// @ts-nocheck
import { GeneratedType } from "@cosmjs/proto-signing";
import { QueryAllSupplyTssObservationRequest } from "./types/cfprotocol/lock/query";
import { QueryAllSupplyHashObservationRequest } from "./types/cfprotocol/lock/query";
import { MsgVoteSupplyTransactionResponse } from "./types/cfprotocol/lock/tx";
import { LockBalanceAllResponse } from "./types/cfprotocol/lock/query";
import { QueryGetSupplyHashObservationResponse } from "./types/cfprotocol/lock/query";
import { LockBalance } from "./types/cfprotocol/lock/lock_balance";
import { ObserveVoteLockingAllResponse } from "./types/cfprotocol/lock/query";
import { GetLockBalanceRequest } from "./types/cfprotocol/lock/query";
import { QueryAllSupplyTransactionResponse } from "./types/cfprotocol/lock/query";
import { MsgHtlcReclaim } from "./types/cfprotocol/lock/tx";
import { GenesisState } from "./types/cfprotocol/lock/genesis";
import { QueryGetSupplyTssObservationRequest } from "./types/cfprotocol/lock/query";
import { QueryGetSupplyTssObservationResponse } from "./types/cfprotocol/lock/query";
import { MsgRequestSupplyResponse } from "./types/cfprotocol/lock/tx";
import { Balance } from "./types/cfprotocol/lock/lock_balance";
import { QueryAssetLockTransactionAllResponse } from "./types/cfprotocol/lock/query";
import { MsgObserveVoteLocking } from "./types/cfprotocol/lock/tx";
import { ObserveVoteLocking } from "./types/cfprotocol/lock/observe_vote_locking";
import { QueryGetSupplyTransactionRequest } from "./types/cfprotocol/lock/query";
import { MsgObserveVoteLockingResponse } from "./types/cfprotocol/lock/tx";
import { QueryAllAssetLockTransactionRequest } from "./types/cfprotocol/lock/query";
import { SupplyHashObservation } from "./types/cfprotocol/lock/supply_hash_observation";
import { MsgUpdateParamsResponse } from "./types/cfprotocol/lock/tx";
import { QueryAllSupplyTransactionRequest } from "./types/cfprotocol/lock/query";
import { QueryGetSupplyTransactionResponse } from "./types/cfprotocol/lock/query";
import { QueryAllSupplyTssObservationResponse } from "./types/cfprotocol/lock/query";
import { MsgHtlcReclaimResponse } from "./types/cfprotocol/lock/tx";
import { AssetLockTransaction } from "./types/cfprotocol/lock/asset_lock_transaction";
import { QueryAssetLockTransactionRequest } from "./types/cfprotocol/lock/query";
import { QueryGetSupplyHashObservationRequest } from "./types/cfprotocol/lock/query";
import { SupplyTransaction } from "./types/cfprotocol/lock/supply_transaction";
import { GetLockBalanceResponse } from "./types/cfprotocol/lock/query";
import { SupplyTssObservation } from "./types/cfprotocol/lock/supply_tss_observation";
import { QueryAssetLockTransactionResponse } from "./types/cfprotocol/lock/query";
import { QueryAllObserveVoteLockingRequest } from "./types/cfprotocol/lock/query";
import { QueryAllSupplyHashObservationResponse } from "./types/cfprotocol/lock/query";
import { QueryGetObserveVoteLockingRequest } from "./types/cfprotocol/lock/query";
import { Params } from "./types/cfprotocol/lock/params";
import { QueryParamsResponse } from "./types/cfprotocol/lock/query";
import { MsgRequestLockResponse } from "./types/cfprotocol/lock/tx";
import { MsgRequestSupply } from "./types/cfprotocol/lock/tx";
import { MsgUpdateParams } from "./types/cfprotocol/lock/tx";
import { QueryGetAvailableLockTransactionRequest } from "./types/cfprotocol/lock/query";
import { LockBalanceAllRequest } from "./types/cfprotocol/lock/query";
import { MsgRequestLock } from "./types/cfprotocol/lock/tx";
import { MsgVoteSupplyHashObserveResponse } from "./types/cfprotocol/lock/tx";
import { ObserveVoteLockingResponse } from "./types/cfprotocol/lock/query";
import { QueryGetAvailableLockTransactionResponse } from "./types/cfprotocol/lock/query";
import { MsgVoteSupplyHashObserve } from "./types/cfprotocol/lock/tx";
import { MsgVoteSupplyTransaction } from "./types/cfprotocol/lock/tx";
import { QueryParamsRequest } from "./types/cfprotocol/lock/query";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/cfprotocol.lock.QueryAllSupplyTssObservationRequest", QueryAllSupplyTssObservationRequest],
    ["/cfprotocol.lock.QueryAllSupplyHashObservationRequest", QueryAllSupplyHashObservationRequest],
    ["/cfprotocol.lock.MsgVoteSupplyTransactionResponse", MsgVoteSupplyTransactionResponse],
    ["/cfprotocol.lock.LockBalanceAllResponse", LockBalanceAllResponse],
    ["/cfprotocol.lock.QueryGetSupplyHashObservationResponse", QueryGetSupplyHashObservationResponse],
    ["/cfprotocol.lock.LockBalance", LockBalance],
    ["/cfprotocol.lock.ObserveVoteLockingAllResponse", ObserveVoteLockingAllResponse],
    ["/cfprotocol.lock.GetLockBalanceRequest", GetLockBalanceRequest],
    ["/cfprotocol.lock.QueryAllSupplyTransactionResponse", QueryAllSupplyTransactionResponse],
    ["/cfprotocol.lock.MsgHtlcReclaim", MsgHtlcReclaim],
    ["/cfprotocol.lock.GenesisState", GenesisState],
    ["/cfprotocol.lock.QueryGetSupplyTssObservationRequest", QueryGetSupplyTssObservationRequest],
    ["/cfprotocol.lock.QueryGetSupplyTssObservationResponse", QueryGetSupplyTssObservationResponse],
    ["/cfprotocol.lock.MsgRequestSupplyResponse", MsgRequestSupplyResponse],
    ["/cfprotocol.lock.Balance", Balance],
    ["/cfprotocol.lock.QueryAssetLockTransactionAllResponse", QueryAssetLockTransactionAllResponse],
    ["/cfprotocol.lock.MsgObserveVoteLocking", MsgObserveVoteLocking],
    ["/cfprotocol.lock.ObserveVoteLocking", ObserveVoteLocking],
    ["/cfprotocol.lock.QueryGetSupplyTransactionRequest", QueryGetSupplyTransactionRequest],
    ["/cfprotocol.lock.MsgObserveVoteLockingResponse", MsgObserveVoteLockingResponse],
    ["/cfprotocol.lock.QueryAllAssetLockTransactionRequest", QueryAllAssetLockTransactionRequest],
    ["/cfprotocol.lock.SupplyHashObservation", SupplyHashObservation],
    ["/cfprotocol.lock.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/cfprotocol.lock.QueryAllSupplyTransactionRequest", QueryAllSupplyTransactionRequest],
    ["/cfprotocol.lock.QueryGetSupplyTransactionResponse", QueryGetSupplyTransactionResponse],
    ["/cfprotocol.lock.QueryAllSupplyTssObservationResponse", QueryAllSupplyTssObservationResponse],
    ["/cfprotocol.lock.MsgHtlcReclaimResponse", MsgHtlcReclaimResponse],
    ["/cfprotocol.lock.AssetLockTransaction", AssetLockTransaction],
    ["/cfprotocol.lock.QueryAssetLockTransactionRequest", QueryAssetLockTransactionRequest],
    ["/cfprotocol.lock.QueryGetSupplyHashObservationRequest", QueryGetSupplyHashObservationRequest],
    ["/cfprotocol.lock.SupplyTransaction", SupplyTransaction],
    ["/cfprotocol.lock.GetLockBalanceResponse", GetLockBalanceResponse],
    ["/cfprotocol.lock.SupplyTssObservation", SupplyTssObservation],
    ["/cfprotocol.lock.QueryAssetLockTransactionResponse", QueryAssetLockTransactionResponse],
    ["/cfprotocol.lock.QueryAllObserveVoteLockingRequest", QueryAllObserveVoteLockingRequest],
    ["/cfprotocol.lock.QueryAllSupplyHashObservationResponse", QueryAllSupplyHashObservationResponse],
    ["/cfprotocol.lock.QueryGetObserveVoteLockingRequest", QueryGetObserveVoteLockingRequest],
    ["/cfprotocol.lock.Params", Params],
    ["/cfprotocol.lock.QueryParamsResponse", QueryParamsResponse],
    ["/cfprotocol.lock.MsgRequestLockResponse", MsgRequestLockResponse],
    ["/cfprotocol.lock.MsgRequestSupply", MsgRequestSupply],
    ["/cfprotocol.lock.MsgUpdateParams", MsgUpdateParams],
    ["/cfprotocol.lock.QueryGetAvailableLockTransactionRequest", QueryGetAvailableLockTransactionRequest],
    ["/cfprotocol.lock.LockBalanceAllRequest", LockBalanceAllRequest],
    ["/cfprotocol.lock.MsgRequestLock", MsgRequestLock],
    ["/cfprotocol.lock.MsgVoteSupplyHashObserveResponse", MsgVoteSupplyHashObserveResponse],
    ["/cfprotocol.lock.ObserveVoteLockingResponse", ObserveVoteLockingResponse],
    ["/cfprotocol.lock.QueryGetAvailableLockTransactionResponse", QueryGetAvailableLockTransactionResponse],
    ["/cfprotocol.lock.MsgVoteSupplyHashObserve", MsgVoteSupplyHashObserve],
    ["/cfprotocol.lock.MsgVoteSupplyTransaction", MsgVoteSupplyTransaction],
    ["/cfprotocol.lock.QueryParamsRequest", QueryParamsRequest],
    
];

export { msgTypes }