// @ts-nocheck
import { GeneratedType } from "@cosmjs/proto-signing";
import { ObserveVote } from "./types/cfprotocol/loan/observe_vote";
import { MsgRequestLoan } from "./types/cfprotocol/loan/tx";
import { QueryGetLoanObservationRequest } from "./types/cfprotocol/loan/query";
import { QueryAllLoanEntityRequest } from "./types/cfprotocol/loan/query";
import { MsgRequestLoanResponse } from "./types/cfprotocol/loan/tx";
import { LoanTransactionAllResponse } from "./types/cfprotocol/loan/query";
import { QueryGetAvailableTransactionResponse } from "./types/cfprotocol/loan/query";
import { QueryGetAccountSuppliedAssetsResponse } from "./types/cfprotocol/loan/query";
import { LoanTransactionResponse } from "./types/cfprotocol/loan/query";
import { QueryGetAccountSuppliedAssetsRequest } from "./types/cfprotocol/loan/query";
import { AssetBorrowed } from "./types/cfprotocol/loan/asset_borrowed";
import { ObserveVoteResponse } from "./types/cfprotocol/loan/query";
import { QueryAllObserveVoteRequest } from "./types/cfprotocol/loan/query";
import { ObserveVoteAllResponse } from "./types/cfprotocol/loan/query";
import { LoanObservation } from "./types/cfprotocol/loan/loan_observation";
import { LoanObservationResponse } from "./types/cfprotocol/loan/query";
import { QueryGetAvailableTransactionRequest } from "./types/cfprotocol/loan/query";
import { MsgUpdateParams } from "./types/cfprotocol/loan/tx";
import { MsgVoteLoanTransactionResponse } from "./types/cfprotocol/loan/tx";
import { MsgObservationVoteResponse } from "./types/cfprotocol/loan/tx";
import { Params } from "./types/cfprotocol/loan/params";
import { QueryGetObserveVoteRequest } from "./types/cfprotocol/loan/query";
import { PoolSummary } from "./types/cfprotocol/loan/pool_summary";
import { QueryAllLoanTransactionRequest } from "./types/cfprotocol/loan/query";
import { QueryGetPoolListResponse } from "./types/cfprotocol/loan/query";
import { MsgObservationVote } from "./types/cfprotocol/loan/tx";
import { AssetPool } from "./types/cfprotocol/loan/asset_pool";
import { AssetSupplied } from "./types/cfprotocol/loan/asset_supplied";
import { LoanEntity } from "./types/cfprotocol/loan/loan_entity";
import { MsgUpdateParamsResponse } from "./types/cfprotocol/loan/tx";
import { QueryGetAccountBorrowedAssetsResponse } from "./types/cfprotocol/loan/query";
import { QueryGetPoolSummaryResponse } from "./types/cfprotocol/loan/query";
import { MsgVoteLoanTransaction } from "./types/cfprotocol/loan/tx";
import { QueryAllLoanObservationRequest } from "./types/cfprotocol/loan/query";
import { QueryAllLoanEntityResponse } from "./types/cfprotocol/loan/query";
import { QueryGetAccountSummaryRequest } from "./types/cfprotocol/loan/query";
import { MsgSetTxProcessResponse } from "./types/cfprotocol/loan/tx";
import { LoanTransaction } from "./types/cfprotocol/loan/transaction";
import { LoanDetail } from "./types/cfprotocol/loan/loan_entity";
import { AccountSummary } from "./types/cfprotocol/loan/account_summary";
import { QueryGetLoanEntityRequest } from "./types/cfprotocol/loan/query";
import { MsgSetTxProcess } from "./types/cfprotocol/loan/tx";
import { GenesisState } from "./types/cfprotocol/loan/genesis";
import { QueryParamsResponse } from "./types/cfprotocol/loan/query";
import { QueryParamsRequest } from "./types/cfprotocol/loan/query";
import { QueryGetLoanTransactionRequest } from "./types/cfprotocol/loan/query";
import { LoanObservationAllResponse } from "./types/cfprotocol/loan/query";
import { QueryGetLoanEntityResponse } from "./types/cfprotocol/loan/query";
import { QueryGetAccountBorrowedAssetsRequest } from "./types/cfprotocol/loan/query";
import { QueryGetPoolListRequest } from "./types/cfprotocol/loan/query";
import { QueryGetAccountSummaryResponse } from "./types/cfprotocol/loan/query";
import { QueryGetPoolSummaryRequest } from "./types/cfprotocol/loan/query";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/cfprotocol.loan.ObserveVote", ObserveVote],
    ["/cfprotocol.loan.MsgRequestLoan", MsgRequestLoan],
    ["/cfprotocol.loan.QueryGetLoanObservationRequest", QueryGetLoanObservationRequest],
    ["/cfprotocol.loan.QueryAllLoanEntityRequest", QueryAllLoanEntityRequest],
    ["/cfprotocol.loan.MsgRequestLoanResponse", MsgRequestLoanResponse],
    ["/cfprotocol.loan.LoanTransactionAllResponse", LoanTransactionAllResponse],
    ["/cfprotocol.loan.QueryGetAvailableTransactionResponse", QueryGetAvailableTransactionResponse],
    ["/cfprotocol.loan.QueryGetAccountSuppliedAssetsResponse", QueryGetAccountSuppliedAssetsResponse],
    ["/cfprotocol.loan.LoanTransactionResponse", LoanTransactionResponse],
    ["/cfprotocol.loan.QueryGetAccountSuppliedAssetsRequest", QueryGetAccountSuppliedAssetsRequest],
    ["/cfprotocol.loan.AssetBorrowed", AssetBorrowed],
    ["/cfprotocol.loan.ObserveVoteResponse", ObserveVoteResponse],
    ["/cfprotocol.loan.QueryAllObserveVoteRequest", QueryAllObserveVoteRequest],
    ["/cfprotocol.loan.ObserveVoteAllResponse", ObserveVoteAllResponse],
    ["/cfprotocol.loan.LoanObservation", LoanObservation],
    ["/cfprotocol.loan.LoanObservationResponse", LoanObservationResponse],
    ["/cfprotocol.loan.QueryGetAvailableTransactionRequest", QueryGetAvailableTransactionRequest],
    ["/cfprotocol.loan.MsgUpdateParams", MsgUpdateParams],
    ["/cfprotocol.loan.MsgVoteLoanTransactionResponse", MsgVoteLoanTransactionResponse],
    ["/cfprotocol.loan.MsgObservationVoteResponse", MsgObservationVoteResponse],
    ["/cfprotocol.loan.Params", Params],
    ["/cfprotocol.loan.QueryGetObserveVoteRequest", QueryGetObserveVoteRequest],
    ["/cfprotocol.loan.PoolSummary", PoolSummary],
    ["/cfprotocol.loan.QueryAllLoanTransactionRequest", QueryAllLoanTransactionRequest],
    ["/cfprotocol.loan.QueryGetPoolListResponse", QueryGetPoolListResponse],
    ["/cfprotocol.loan.MsgObservationVote", MsgObservationVote],
    ["/cfprotocol.loan.AssetPool", AssetPool],
    ["/cfprotocol.loan.AssetSupplied", AssetSupplied],
    ["/cfprotocol.loan.LoanEntity", LoanEntity],
    ["/cfprotocol.loan.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/cfprotocol.loan.QueryGetAccountBorrowedAssetsResponse", QueryGetAccountBorrowedAssetsResponse],
    ["/cfprotocol.loan.QueryGetPoolSummaryResponse", QueryGetPoolSummaryResponse],
    ["/cfprotocol.loan.MsgVoteLoanTransaction", MsgVoteLoanTransaction],
    ["/cfprotocol.loan.QueryAllLoanObservationRequest", QueryAllLoanObservationRequest],
    ["/cfprotocol.loan.QueryAllLoanEntityResponse", QueryAllLoanEntityResponse],
    ["/cfprotocol.loan.QueryGetAccountSummaryRequest", QueryGetAccountSummaryRequest],
    ["/cfprotocol.loan.MsgSetTxProcessResponse", MsgSetTxProcessResponse],
    ["/cfprotocol.loan.LoanTransaction", LoanTransaction],
    ["/cfprotocol.loan.LoanDetail", LoanDetail],
    ["/cfprotocol.loan.AccountSummary", AccountSummary],
    ["/cfprotocol.loan.QueryGetLoanEntityRequest", QueryGetLoanEntityRequest],
    ["/cfprotocol.loan.MsgSetTxProcess", MsgSetTxProcess],
    ["/cfprotocol.loan.GenesisState", GenesisState],
    ["/cfprotocol.loan.QueryParamsResponse", QueryParamsResponse],
    ["/cfprotocol.loan.QueryParamsRequest", QueryParamsRequest],
    ["/cfprotocol.loan.QueryGetLoanTransactionRequest", QueryGetLoanTransactionRequest],
    ["/cfprotocol.loan.LoanObservationAllResponse", LoanObservationAllResponse],
    ["/cfprotocol.loan.QueryGetLoanEntityResponse", QueryGetLoanEntityResponse],
    ["/cfprotocol.loan.QueryGetAccountBorrowedAssetsRequest", QueryGetAccountBorrowedAssetsRequest],
    ["/cfprotocol.loan.QueryGetPoolListRequest", QueryGetPoolListRequest],
    ["/cfprotocol.loan.QueryGetAccountSummaryResponse", QueryGetAccountSummaryResponse],
    ["/cfprotocol.loan.QueryGetPoolSummaryRequest", QueryGetPoolSummaryRequest],
    
];

export { msgTypes }