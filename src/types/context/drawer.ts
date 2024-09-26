import { Props as ConnectWalletDrawerProps } from '@/components/drawer/variants/wallet.drawer'
import { Props  as PoolDrawerProps } from '@/components/drawer/variants/main-pool.drawer'
import { Props  as StakeDrawerProps } from '@/components/drawer/variants/stake'
import { Props  as WithdrawDrawerProps } from '@/components/drawer/variants/withdraw'
export interface BaseProps {
  visible: boolean
  onClose: () => void
}

interface IConnectWallet
  extends Omit<ConnectWalletDrawerProps, 'onClose' | 'visible'> {
  id: 'CONNECT_WALLET'
}

interface IPoolDrawer
  extends Omit<PoolDrawerProps, 'onClose' | 'visible'> {
    id: 'POOL'
  }

interface IStakeDrawer
  extends Omit<StakeDrawerProps, 'onClose' | 'visible'> {
    id: 'STAKE'
  }

interface IWithdrawDrawer
  extends Omit<WithdrawDrawerProps, 'onClose' | 'visible'> {
    id: 'WITHDRAW'
  }

export type DrawerProps =
  | IConnectWallet
  | IPoolDrawer
  | IStakeDrawer
  | IWithdrawDrawer

