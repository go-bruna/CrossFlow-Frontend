// import { ArrowUpIcon } from "@/assets/icons/arrow"
// import { Avatar } from "@/components/avatar"
// import Card from "@/components/card"
// import { Typography } from "@/components/typography"
// import { ROUTES } from "@/constants/routes"
// import { useWindowSize } from "@/hooks/useWindowSize"
// import { useLocation, useNavigate } from "react-router-dom"
// import { twMerge } from "tailwind-merge"

// type Props = {
//   reference?: any
// }

// export const Footer = ({ reference }: Props) => {
//   const navigate = useNavigate()
//   const location = useLocation();
//   const { isMobile, windowSize } = useWindowSize()
  
//   const onScrollUp = () => {
//     if (reference.current) {
//       reference.current?.scroll({top: 0, left: 0, behavior: 'smooth' })
//     }
//   }

//   const onNavigate = (route: string) => {
//     navigate(route)
//     onScrollUp()
//   }

//   const goToDocument = () => {
//     window.open("https://ordibank.gitbook.io/untitled", "_blank")
//   }
//   const goToCoingecko = () => {
//     window.open("https://www.coingecko.com/en/coins/ordibank", "_blank")
//   }
//   const goToTwitter = () => {
//     window.open("https://x.com/Ordibank?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor", "_blank")
//   }
//   const goToDiscord = () => {
//     window.open("https://discord.gg/ordibank", "_blank")
//   }
//   const goToGitbook = () => {
//     window.open("https://ordibank.gitbook.io/untitled", "_blank")
//   }
//   const goToTelegram = () => {
//     window.open("https://t.me/ordibank", "_blank")
//   }

//   const DesktopFooter = () => (
//     <div className='flex min-w-[960px] justify-between py-5 border-t border-zinc-300'>
//       <div className='flex justify-start gap-5'>
//         <Typography 
//           variant="label-small" 
//           className="cursor-pointer"
//           onClick={goToDocument} >
//             Documentation
//           </Typography>
//         {/* <Typography variant="label-small">Terms & Conditions </Typography> */}
//       </div>
//       <div className="flex items-center gap-4">
//         <Avatar 
//           icon={<TwitterIcon />}
//           className="cursor-pointer" 
//           onClick={goToTwitter}
//         />
//         <Avatar 
//           className="cursor-pointer" 
//           icon={<DiscordIcon />} 
//           onClick={goToDiscord}
//         />
//         <Avatar
//           className="cursor-pointer"  
//           icon={<GitbookIcon />} 
//           onClick={goToGitbook}
//         />
//         <Avatar 
//           className="cursor-pointer" 
//           icon={<TelegramIcon />} 
//           onClick={goToTelegram}
//         />
//         <Avatar 
//           className="cursor-pointer" 
//           icon={<FrogIcon />} 
//           onClick={goToCoingecko}
//         />
//       </div>
//     </div>
//   )

//   const MobileFooter = () => {
//     return (
//       <>
//         <div className='flex flex-1 justify-between py-5 border-t border-zinc-300 mb-[40px]'>
//           <div className='flex justify-start gap-5'>
//             <Typography 
//               variant="label-small" 
//               className="cursor-pointer"
//               onClick={goToDocument} >
//                 Documentation
//               </Typography>
//           </div>
//           <div className="flex items-center gap-4">
//             <Avatar
//               className="cursor-pointer" 
//               icon={<TwitterIcon />} 
//               onClick={goToTwitter} 
//             />
//             <Avatar 
//               className="cursor-pointer"
//               icon={<FrogIcon />} 
//               onClick={goToCoingecko} 
//             />
//           </div>
//         </div>
//         <Card.Wrapper
//           classOverride={{
//             container: 'custom-shadow sticky bottom-[10px] w-full',
//             subContainer: 'bg-gradient-to-b from-gray-900 to-gray-900 flex justify-between items-center py-[15px]'
//           }}
//           style={{
//             maxWidth: `${windowSize.width - 40}px`,
//           }}
//         >
//           <>
//             <div className="flex items-center gap-5">
//               <Typography 
//                 variant="label-medium" 
//                 className={twMerge("text-white", location.pathname.includes(ROUTES.STAKE) && 'font-bold')} 
//                 onClick={() => onNavigate(ROUTES.STAKE)}
//               >
//                 Staking
//               </Typography>

//               <Typography 
//                 variant="label-medium" 
//                 className={twMerge(
//                   "text-white", 
//                   // location.pathname.includes(ROUTES.DELEGATE) && 'font-bold'
//                 )} 
//                 onClick={() => window.open("https://poc.sandbox.ordibank.org/main", "_blank")}
//               >
//                 Try POC
//               </Typography>
//             </div>
//             <Avatar 
//               icon={<ArrowUpIcon /> } 
//               onClick={onScrollUp}
//             />
//           </>
//         </Card.Wrapper>
//       </>
//     )
//   }

//   return (
//     <>
//       {isMobile ? MobileFooter() : DesktopFooter()}
//     </>
//   )
// }