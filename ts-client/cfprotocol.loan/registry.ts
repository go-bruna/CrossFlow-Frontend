// @ts-nocheck
import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgRequestLoanResponse } from "./types/cfprotocol/loan/tx";
import { QueryAllObserveVoteRequest } from "./types/cfprotocol/loan/query";
import { ObserveVoteAllResponse } from "./types/cfprotocol/loan/query";
import { ObserveVoteResponse } from "./types/cfprotocol/loan/query";
import { QueryGetLoanEntityResponse } from "./types/cfprotocol/loan/query";
import { QueryGetAccountSummaryResponse } from "./types/cfprotocol/loan/query";
import { PoolSummary } from "./types/cfprotocol/loan/pool_summary";
import { MsgUpdateParamsResponse } from "./types/cfprotocol/loan/tx";
import { AssetBorrowed } from "./types/cfprotocol/loan/asset_borrowed";
import { QueryAllLoanTransactionRequest } from "./types/cfprotocol/loan/query";
import { QueryGetPoolListRequest } from "./types/cfprotocol/loan/query";
import { QueryGetLoanObservationRequest } from "./types/cfprotocol/loan/query";
import { MsgObservationVoteResponse } from "./types/cfprotocol/loan/tx";
import { AssetSupplied } from "./types/cfprotocol/loan/asset_supplied";
import { QueryGetLoanTransactionRequest } from "./types/cfprotocol/loan/query";
import { QueryGetAvailableTransactionRequest } from "./types/cfprotocol/loan/query";
import { LoanObservation } from "./types/cfprotocol/loan/loan_observation";
import { MsgVoteLoanTransaction } from "./types/cfprotocol/loan/tx";
import { QueryParamsRequest } from "./types/cfprotocol/loan/query";
import { LoanTransactionAllResponse } from "./types/cfprotocol/loan/query";
import { QueryGetAccountBorrowedAssetsRequest } from "./types/cfprotocol/loan/query";
import { QueryGetPoolListResponse } from "./types/cfprotocol/loan/query";
import { Params } from "./types/cfprotocol/loan/params";
import { MsgVoteLoanTransactionResponse } from "./types/cfprotocol/loan/tx";
import { QueryGetLoanEntityRequest } from "./types/cfprotocol/loan/query";
import { QueryGetAccountSummaryRequest } from "./types/cfprotocol/loan/query";
import { LoanTransaction } from "./types/cfprotocol/loan/transaction";
import { LoanEntity } from "./types/cfprotocol/loan/loan_entity";
import { QueryGetPoolSummaryResponse } from "./types/cfprotocol/loan/query";
import { AssetPool } from "./types/cfprotocol/loan/asset_pool";
import { MsgSetTxProcess } from "./types/cfprotocol/loan/tx";
import { QueryGetObserveVoteRequest } from "./types/cfprotocol/loan/query";
import { QueryAllLoanEntityRequest } from "./types/cfprotocol/loan/query";
import { QueryAllLoanEntityResponse } from "./types/cfprotocol/loan/query";
import { QueryGetAccountBorrowedAssetsResponse } from "./types/cfprotocol/loan/query";
import { LoanObservationResponse } from "./types/cfprotocol/loan/query";
import { QueryAllLoanObservationRequest } from "./types/cfprotocol/loan/query";
import { LoanObservationAllResponse } from "./types/cfprotocol/loan/query";
import { ObserveVote } from "./types/cfprotocol/loan/observe_vote";
import { MsgRequestLoan } from "./types/cfprotocol/loan/tx";
import { QueryGetAccountSuppliedAssetsResponse } from "./types/cfprotocol/loan/query";
import { AccountSummary } from "./types/cfprotocol/loan/account_summary";
import { LoanTransactionResponse } from "./types/cfprotocol/loan/query";
import { QueryGetPoolSummaryRequest } from "./types/cfprotocol/loan/query";
import { QueryGetAvailableTransactionResponse } from "./types/cfprotocol/loan/query";
import { MsgObservationVote } from "./types/cfprotocol/loan/tx";
import { MsgUpdateParams } from "./types/cfprotocol/loan/tx";
import { LoanDetail } from "./types/cfprotocol/loan/loan_entity";
import { QueryGetAccountSuppliedAssetsRequest } from "./types/cfprotocol/loan/query";
import { GenesisState } from "./types/cfprotocol/loan/genesis";
import { MsgSetTxProcessResponse } from "./types/cfprotocol/loan/tx";
import { QueryParamsResponse } from "./types/cfprotocol/loan/query";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/cfprotocol.loan.MsgRequestLoanResponse", MsgRequestLoanResponse],
    ["/cfprotocol.loan.QueryAllObserveVoteRequest", QueryAllObserveVoteRequest],
    ["/cfprotocol.loan.ObserveVoteAllResponse", ObserveVoteAllResponse],
    ["/cfprotocol.loan.ObserveVoteResponse", ObserveVoteResponse],
    ["/cfprotocol.loan.QueryGetLoanEntityResponse", QueryGetLoanEntityResponse],
    ["/cfprotocol.loan.QueryGetAccountSummaryResponse", QueryGetAccountSummaryResponse],
    ["/cfprotocol.loan.PoolSummary", PoolSummary],
    ["/cfprotocol.loan.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/cfprotocol.loan.AssetBorrowed", AssetBorrowed],
    ["/cfprotocol.loan.QueryAllLoanTransactionRequest", QueryAllLoanTransactionRequest],
    ["/cfprotocol.loan.QueryGetPoolListRequest", QueryGetPoolListRequest],
    ["/cfprotocol.loan.QueryGetLoanObservationRequest", QueryGetLoanObservationRequest],
    ["/cfprotocol.loan.MsgObservationVoteResponse", MsgObservationVoteResponse],
    ["/cfprotocol.loan.AssetSupplied", AssetSupplied],
    ["/cfprotocol.loan.QueryGetLoanTransactionRequest", QueryGetLoanTransactionRequest],
    ["/cfprotocol.loan.QueryGetAvailableTransactionRequest", QueryGetAvailableTransactionRequest],
    ["/cfprotocol.loan.LoanObservation", LoanObservation],
    ["/cfprotocol.loan.MsgVoteLoanTransaction", MsgVoteLoanTransaction],
    ["/cfprotocol.loan.QueryParamsRequest", QueryParamsRequest],
    ["/cfprotocol.loan.LoanTransactionAllResponse", LoanTransactionAllResponse],
    ["/cfprotocol.loan.QueryGetAccountBorrowedAssetsRequest", QueryGetAccountBorrowedAssetsRequest],
    ["/cfprotocol.loan.QueryGetPoolListResponse", QueryGetPoolListResponse],
    ["/cfprotocol.loan.Params", Params],
    ["/cfprotocol.loan.MsgVoteLoanTransactionResponse", MsgVoteLoanTransactionResponse],
    ["/cfprotocol.loan.QueryGetLoanEntityRequest", QueryGetLoanEntityRequest],
    ["/cfprotocol.loan.QueryGetAccountSummaryRequest", QueryGetAccountSummaryRequest],
    ["/cfprotocol.loan.LoanTransaction", LoanTransaction],
    ["/cfprotocol.loan.LoanEntity", LoanEntity],
    ["/cfprotocol.loan.QueryGetPoolSummaryResponse", QueryGetPoolSummaryResponse],
    ["/cfprotocol.loan.AssetPool", AssetPool],
    ["/cfprotocol.loan.MsgSetTxProcess", MsgSetTxProcess],
    ["/cfprotocol.loan.QueryGetObserveVoteRequest", QueryGetObserveVoteRequest],
    ["/cfprotocol.loan.QueryAllLoanEntityRequest", QueryAllLoanEntityRequest],
    ["/cfprotocol.loan.QueryAllLoanEntityResponse", QueryAllLoanEntityResponse],
    ["/cfprotocol.loan.QueryGetAccountBorrowedAssetsResponse", QueryGetAccountBorrowedAssetsResponse],
    ["/cfprotocol.loan.LoanObservationResponse", LoanObservationResponse],
    ["/cfprotocol.loan.QueryAllLoanObservationRequest", QueryAllLoanObservationRequest],
    ["/cfprotocol.loan.LoanObservationAllResponse", LoanObservationAllResponse],
    ["/cfprotocol.loan.ObserveVote", ObserveVote],
    ["/cfprotocol.loan.MsgRequestLoan", MsgRequestLoan],
    ["/cfprotocol.loan.QueryGetAccountSuppliedAssetsResponse", QueryGetAccountSuppliedAssetsResponse],
    ["/cfprotocol.loan.AccountSummary", AccountSummary],
    ["/cfprotocol.loan.LoanTransactionResponse", LoanTransactionResponse],
    ["/cfprotocol.loan.QueryGetPoolSummaryRequest", QueryGetPoolSummaryRequest],
    ["/cfprotocol.loan.QueryGetAvailableTransactionResponse", QueryGetAvailableTransactionResponse],
    ["/cfprotocol.loan.MsgObservationVote", MsgObservationVote],
    ["/cfprotocol.loan.MsgUpdateParams", MsgUpdateParams],
    ["/cfprotocol.loan.LoanDetail", LoanDetail],
    ["/cfprotocol.loan.QueryGetAccountSuppliedAssetsRequest", QueryGetAccountSuppliedAssetsRequest],
    ["/cfprotocol.loan.GenesisState", GenesisState],
    ["/cfprotocol.loan.MsgSetTxProcessResponse", MsgSetTxProcessResponse],
    ["/cfprotocol.loan.QueryParamsResponse", QueryParamsResponse],
    
];

export { msgTypes }