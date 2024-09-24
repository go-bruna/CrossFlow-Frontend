// import { CancelIcon } from '@/assets/icons/cancel'
// import Drawer from 'react-modern-drawer'
import { BaseProps } from '@/types/context/drawer'
// import { Avatar } from '@/components/avatar'
// import { WalletAddress } from '@/components/wallet-address'
// import { Wallets } from '../base/walletlist'
// import { useWindowSize } from '@/hooks/useWindowSize'
// import { twMerge } from 'tailwind-merge'

export type tabType = 'Wallets' | 'Transactions'
export interface Props extends BaseProps {
  tab?: tabType
}

export const WalletDrawer = (props: Props) => {
  console.log(props)
  return (
    <></>
  )
  // const { isDesktop } = useWindowSize()

  // return (
  //   <Drawer
  //     open={props.visible}
  //     onClose={props.onClose}
  //     direction={'bottom'}
  //     style={{
  //       width: isDesktop ? '600px' : '100%',
  //       height: '320px',
  //       zIndex: 11,
  //     }}
  //     zIndex={10}
  //   >
  //     <div 
  //       className={twMerge(
  //         'bg-gradient-to-b from-zinc-300 to-sky-300 h-full',
  //         // windowSize.width < 820 && 'h-[85%] overflow-auto'
  //       )}
  //     >
  //       <div
  //         className={twMerge(
  //           'bg-gradient-to-b from-white to-slate-200/80 flex flex-col gap-5 h-full p-[2.5rem] px-[1.25rem] pb-[2rem]',
  //         )}
  //       >
  //         <div className="flex flex-col gap-6">
  //           {/* drawer header */}
  //           <div className="flex justify-between">
  //             <div className="flex flex-col lg:flex-row items-center gap-2">
  //               <WalletAddress walletType={'Bitcoin'} />
  //               <WalletAddress walletType={'Ethereum'} />
  //             </div>
  //             <div className="flex items-center gap-3">
  //               {/* <Avatar
  //                 className='bg-transparant'
  //                 icon={<SettingIcon />}
  //               /> */}
  //               <Avatar
  //                 className="bg-transparant"
  //                 icon={<CancelIcon />}
  //                 onClick={props.onClose}
  //               />
  //             </div>
  //           </div>

  //           <Wallets />
  //         </div>
  //       </div>
  //     </div>
  //   </Drawer>
  // )
}
