import { PoolDrawer } from './variants/main-pool.drawer'
import { StakeDrawer } from './variants/stake'
import { VotingDrawer } from './variants/voting'
import { WalletDrawer } from './variants/wallet.drawer'
import { WithdrawDrawer } from './variants/withdraw'

export default {
  ConnectWallet: WalletDrawer,
  Pool: PoolDrawer,
  Stake: StakeDrawer,
  Withdraw: WithdrawDrawer,
  Voting: VotingDrawer,
}

