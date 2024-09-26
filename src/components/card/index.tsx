import { CardWrapper } from "./variants/container.card";
import { ORBKConnectWalletCard } from "./variants/ordk.connect-wallet.card";
import { AccountStatsbar } from "./variants/stats.account.card";
import { GovernanceDetailStatsbar } from "./variants/stats.governance-detail.card";
import { GovernanceStatsbar } from "./variants/stats.governance.card";
import { MainPoolStatsbar } from "./variants/stats.main-pool.card";

export default {
  Wrapper: CardWrapper,
  ORBKConnectWallet: ORBKConnectWalletCard,
  MainStatsBar: MainPoolStatsbar,
  AccountStatsBar: AccountStatsbar,
  GovernanceStatsBar: GovernanceStatsbar,
  GovernanceDetailStatsBar: GovernanceDetailStatsbar,
}