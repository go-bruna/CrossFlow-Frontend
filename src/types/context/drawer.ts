import { Props as ConnectWalletDrawerProps } from '@/components/drawer/variants/wallet.drawer'
import { Props  as PoolDrawerProps } from '@/components/drawer/variants/main-pool.drawer'
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

export type DrawerProps =
  | IConnectWallet
  | IPoolDrawer

