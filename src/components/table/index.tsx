import { BorrowedAssetsTable } from "./borrowed-asset/table";
import { DeletegateTable } from "./delegate/table";
import { GovernanceTable } from "./governance/table";
import { MainPoolsTable } from "./main-pool/table";
import { StakeTable } from "./stake/table";
import { SuppliedAssetsTable } from "./supplied-asset/table";

export default {
  Delegate: DeletegateTable,
  Stake: StakeTable,
  MainPools: MainPoolsTable,
  SuppliedAssets: SuppliedAssetsTable,
  BorrowedAssets: BorrowedAssetsTable,
  Governance: GovernanceTable,
}