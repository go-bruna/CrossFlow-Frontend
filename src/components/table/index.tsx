import { BorrowedAssetsTable } from "./borrowed-asset/table";
import { DeletegateTable } from "./delegate/table";
import { GovernanceTable } from "./governance/table";
import { LoanTransactionTable } from "./loan-transaction/table";
import { LockTransactionTable } from "./lock-transaction/table";
import { MainPoolsTable } from "./main-pool/table";
import { StakeGenerationTable } from "./stake-generation/table";
import { StakeValidatorTable } from "./stake-validators/table";
import { SuppliedAssetsTable } from "./supplied-asset/table";
import { SupplyTransactionTable } from "./supply-transaction/table";

export default {
  Delegate: DeletegateTable,
  StakeValidator: StakeValidatorTable,
  StakeGeneration: StakeGenerationTable,
  MainPools: MainPoolsTable,
  SuppliedAssets: SuppliedAssetsTable,
  BorrowedAssets: BorrowedAssetsTable,
  Governance: GovernanceTable,
  LockTransaction: LockTransactionTable,
  LoanTransaction: LoanTransactionTable,
  SupplyTransaction: SupplyTransactionTable,
}