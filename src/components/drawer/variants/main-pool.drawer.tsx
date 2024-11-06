import Drawer from 'react-modern-drawer'
import { BaseProps } from '@/types/context/drawer'
import { useWindowSize } from '@/hooks/useWindowSize'
import { twMerge } from 'tailwind-merge'
import Tab from '@/components/tab'
import { useState } from 'react'
import { SupplyContainer } from '../base/pool/supply.base'
import { BorrowContainer } from '../base/pool/borrow.base'
// import { WithdrawContainer } from '../base/pool/withdraw.base'
import { RepayContainer } from '../base/pool/repay.base'
import { handleAnimation } from '@/utils'
import { ITag } from '@/types/interfaces'
import { IPool } from '@/types/api/pool'
import { LockContainer } from '../base/pool/lock.base'

const tabs = [
  { title: 'Lock'},
  { title: 'Supply' },
  { title: 'Borrow' },
  // { title: 'Withdraw' },
  { title: 'Repay' },
]
export interface Props extends BaseProps {
  data: IPool
}

export const PoolDrawer = (props: Props) => {
  const { isDesktop } = useWindowSize()
  const [ current, setCurrent ] = useState<ITag>(tabs[0])
  const [ opacityAnimation, setOpacityAnimation ] = useState<boolean>(false)
  
  const displayContainer = {
    'Lock': <LockContainer />,
    'Supply': <SupplyContainer />,
    'Borrow': <BorrowContainer />,
    // 'Withdraw': <WithdrawContainer />,
    'Repay': <RepayContainer />
  }[current.title] as JSX.Element

  const handleContainer = async(tag: ITag) => {
    await handleAnimation(() => setOpacityAnimation(true))
    setOpacityAnimation(false)
    setCurrent(tag)
  } 

  return (
    <Drawer
      open={props.visible}
      onClose={props.onClose}
      direction={'right'}
      style={{
        width: isDesktop ? '520px' : '100%',
      }}
    >
        <div
          className={twMerge(
            'bg-[#101010] flex flex-col gap-5 h-full px-11 py-10 overflow-y-auto',
          )}
        >
          {/* tabs */}
          <Tab.List
            tabs={tabs}
            selected={current}
            onSelect={handleContainer}
            classOverride={{
              container: 'lg:gap-2',
              tabButton: 'w-auto rounded-full px-5 text-[13px]'
            }}
          />

          <div className={twMerge('w-full animate-fade-in-up', opacityAnimation && 'animate-fade-out')}>
            {displayContainer}
          </div>
        </div>
    </Drawer>
  )
}
