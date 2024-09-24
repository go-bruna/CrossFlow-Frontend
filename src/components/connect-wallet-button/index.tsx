// 'use client'

// import { ConnectButton } from '@rainbow-me/rainbowkit'
// import { useEffect, useState } from 'react'

// import { WalletIcon } from '@/lib/assets/icons/wallet-icon'

// import { LoadingSpinner } from '../loading-spinner'

// export const ConnectWalletButton = () => {
//   const [isConnecting, setIsConnecting] = useState(false)
//   const [addressLength, setAddressLength] = useState({ start: 6, end: 6 }) // Default for desktop

//   const reportConnectedWallet = (address: string) => {
//     import('react-facebook-pixel')
//       .then((x) => x.default)
//       .then((ReactPixel) => {
//         ReactPixel.trackCustom('WalletConnected', {
//           address,
//         })
//         setIsConnecting(false)
//       })
//   }

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 1024) {
//         // Tablet
//         setAddressLength({ start: 3, end: 3 })
//       } else {
//         // Desktop
//         setAddressLength({ start: 6, end: 6 })
//       }
//     }

//     window.addEventListener('resize', handleResize)
//     handleResize() // Initialize the state based on the current screen size

//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   const truncateAddress = (address: string) => {
//     const firstPart = address.slice(0, addressLength.start)
//     const lastPart = address.slice(-addressLength.end)
//     return `${firstPart}...${lastPart}`
//   }

//   const handleConnectClick = (openConnectModal: () => void) => {
//     setIsConnecting(true)
//     openConnectModal()
//   }

//   return (
//     <ConnectButton.Custom>
//       {({
//         account,
//         chain,
//         openAccountModal,
//         openChainModal,
//         openConnectModal,
//         mounted,
//       }) => {
//         // Note: If your app doesn't use authentication, you
//         // can remove all 'authenticationStatus' checks
//         const ready = mounted
//         const connected = ready && account && chain

//         if (connected && isConnecting) {
//           reportConnectedWallet(account.address)
//         }

//         return (
//           <div>
//             {(() => {
//               if (!ready) {
//                 return (
//                   <div className="w-[150px] flex justify-center">
//                     <LoadingSpinner />
//                   </div>
//                 )
//               }
//               if (!connected) {
//                 return (
//                   <button
//                     onClick={() => handleConnectClick(openConnectModal)}
//                     type="button"
//                     className="flex flex-row items-center justify-center px-3 py-2 rounded-md bg-[#24272C] dark:border dark:border-[#30343A] gap-x-[6px]"
//                   >
//                     <WalletIcon />
//                     <span className="text-[13px] font-bold text-white">
//                       Connect Wallet
//                     </span>
//                   </button>
//                 )
//               }
//               if (chain.unsupported) {
//                 return (
//                   <button
//                     onClick={openChainModal}
//                     type="button"
//                     className="flex flex-row items-center justify-center px-3 py-2 rounded-md bg-[#24272C] dark:border dark:border-[#30343A] gap-x-[6px]"
//                   >
//                     <WalletIcon />
//                     <span className="text-[13px] font-bold text-white">
//                       Wrong network
//                     </span>
//                   </button>
//                 )
//               }
//               return (
//                 <button
//                   onClick={openAccountModal}
//                   type="button"
//                   className="flex flex-row items-center justify-center px-3 py-2 rounded-md bg-[#24272C] dark:border dark:border-[#30343A] gap-x-[6px]"
//                 >
//                   <WalletIcon />
//                   <span className="text-[13px] font-bold text-white">
//                     {account.ensName || truncateAddress(account.address)}
//                   </span>
//                 </button>
//               )
//             })()}
//           </div>
//         )
//       }}
//     </ConnectButton.Custom>
//   )
// }
