import { CardWrapper } from "./variants/container.card";
import { ORBKBalanceCard } from "./variants/ordk.balance.card";
import { ORBKConnectWalletCard } from "./variants/ordk.connect-wallet.card";
import { MainPoolStatsbar } from "./variants/stats.main-pool.card";
import { CardValidator } from "./variants/validator.card";

export default {
  Wrapper: CardWrapper,
  Validator: CardValidator,
  ORBK: ORBKBalanceCard,
  ORBKConnectWallet: ORBKConnectWalletCard,
  MainStatsBar: MainPoolStatsbar,
}