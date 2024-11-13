import { Props  as PoolDrawerProps } from '@/components/drawer/variants/main-pool.drawer'
import { Props  as StakeDrawerProps } from '@/components/drawer/variants/stake'
import { Props  as WithdrawDrawerProps } from '@/components/drawer/variants/withdraw'
import { Props  as VotingDrawerProps } from '@/components/drawer/variants/voting'

export interface BaseProps {
  visible: boolean
  onClose: () => void
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

interface IVotingDrawer
  extends Omit<VotingDrawerProps, 'onClose' | 'visible'> {
    id: 'VOTING'
  }

export type DrawerProps =
  | IPoolDrawer
  | IStakeDrawer
  | IWithdrawDrawer
  | IVotingDrawer
