
// import { 
//   useEffect,
//   // ChangeEvent, 
//   useMemo, 
//   useState 
// } from "react"
// import Button from "@/components/button"
// import Paragraph from "@/components/paragraph"
// import { Input } from "@/components/input"
// // import { CustomProgress } from "@/components/progress"
// import { AmountIcon } from "@/assets/icons/amount"
// import { Typography } from "@/components/typography"
// import { twMerge } from "tailwind-merge"
// // import { Avatar } from "@/components/avatar"
// // import { ArrowRightIcon } from "@/assets/icons/arrow"
// import { 
//   useAccount,
//   useOfflineSigners, 
//   // useBalance 
// } from 'graz'
// // import { cosmoshub } from '@/config/graz'
// import { pureNumberFormat } from "@/utils"
// import { useLockBalance } from "@/hooks/queries/useLockBalance"
// import Dropdown from "@/components/dropdown"
// import { IBaseBalance, IBaseLockBalance } from "@/types/api/other"
// import { GET_POOL_LOCK_BALANCE } from "@/constants/query"
// import { queryClient } from "@/wagmi"
// import { useToast } from "@/hooks/useToast"
// import { FAILED_WALLET_CONNECTION, WALLET_INSTALL, WARNING_MESSAGE } from "@/constants/message"
// import { TxClient } from "@/cf-client/client"
// import { MsgRequestSupply } from "@/cf-client/cfprotocol.lock/tx"
// import { TailSpin } from "react-loader-spinner"
// import { MsgRequestLoan } from "@/cf-client/cfprotocol.loan/tx"

// export const BorrowContainer = () => {
//   const { messageApi } = useToast()
//   const { data: account } = useAccount()
//   const { data: lockData } = useLockBalance()
//   const { data: offlineSigners } = useOfflineSigners()
//   // const { data: balance } = useBalance({
//   //   chainId: cosmoshub.chainId,
//   //   denom: cosmoshub.stakeCurrency.coinMinimalDenom,
//   //   bech32Address: account?.bech32Address,
//   // });
//   const [selected, setSelected] = useState<IBaseBalance | undefined>(undefined)
//   // const [ amount, setAmount ] = useState<number | undefined>(undefined)
//   const [ activeLock, setActiveLock ] = useState<IBaseLockBalance | undefined>(undefined)
//   const [ loading, setLoading ] = useState<boolean>(false)

//   const dropdownArr = useMemo(() => {
//     if (
//       !account?.bech32Address || 
//       !lockData || 
//       !lockData.lock_balance || 
//       lockData.lock_balance.length < 1
//     )
//       return []
//     const _filteredData = lockData.lock_balance.find((e: IBaseLockBalance) => e.creator === account.bech32Address)
//     setActiveLock(_filteredData)
//     if (!_filteredData)
//       return []
//     const _dropdownBalances = _filteredData.balances
//     return _dropdownBalances
//   }, [lockData, account?.bech32Address])

//   /**
//    * Handle supply
//    */
//   const handleBorrow = async () => {

//     if (!window.keplr) {
//       return messageApi.Alert(WALLET_INSTALL("Kelpr"));
//     }
//     if (!account?.bech32Address || !offlineSigners?.offlineSigner) {
//       return messageApi.Alert(FAILED_WALLET_CONNECTION);
//     }
//     if (!activeLock || !selected)
//       return messageApi.Alert({ ...WARNING_MESSAGE, content: 'Select a lock item to be supplied.'})

//     try {
//       setLoading(true)

//       const _loanData: MsgRequestLoan = {
//         creator: activeLock.creator,
//         assetId: Number(selected.asset_id),
//         amount: selected.balance,
//         interestRate: selected.interest_rate,
//         loanRate: '',
//         loanAddress: '',
//         reserved: "",
//         duration: 1000
//       }

//       const client = await TxClient(offlineSigners?.offlineSigner);
//       let msg = await client.msgRequestLoan(_loanData);
//       const result = await client.signAndBroadcast([msg]);

//       setLoading(false)
//       await invalidateQuery()
      
//       console.log("Borrow result ====>", result);
//     } catch (error) {
//       console.log("Borrow Error is ===>", error)
//     }
//   }

//   // invalidate queries
//   const invalidateQuery = async () => {
//     Promise.all([
//       queryClient.invalidateQueries({ queryKey: [GET_POOL_LOCK_BALANCE] }),
//     ])
//   }

//   useEffect(() => {
//     invalidateQuery()
//   }, [])

//   return (
//     <div className="w-full mt-[30px]">
//       {/* Search */}
//       <Typography variant="label-medium" className="text-[13px] font-medium">Amount</Typography>

//       <div className="flex flex-col gap-[10px] mt-8">
//         <Typography variant="label-small" className="f-light">
//           Select Borrow Amount
//         </Typography>
//         <Dropdown.Balances
//           list={dropdownArr}
//           value={selected}
//           onChange={setSelected}
//           className="rounded-lg"
//         />
//       </div>

//       <Input 
//         type="number"
//         // value={amount ?? ''}
//         value={selected?.balance ?? `NaN`}
//         placeholder="0.00"
//         icon={<AmountIcon />}
//         // innerButtonLabel="Max"
//         // onMax={() => setAmount(Number(balance?.amount) ?? 0)}
//         // onChange={(e: ChangeEvent<HTMLInputElement>) =>
//         //   setAmount(Number(parseInt(e.target.value)))
//         // }
//         classOverride={{
//           container: 'mt-[14px]',
//           inputContainer: 'bg-black',
//           input: 'bg-black ml-1',
//           value: 'text-[13px] text-[#5e7e8e]',
//           icon: 'w-8'
//         }}
//         disabled={true}
//       />

//       <Paragraph.List
//         label="Suppliable amount" 
//         // value={`${numberFormat(balance?.amount ?? 0)} ${props.data.asset_symbol}`}
//         value={pureNumberFormat(dropdownArr.reduce((res: number, curr: IBaseBalance) => res + Number(curr.balance) / 1e8, 0))}
//         classOverride={{
//           container: 'flex-1 pt-4 pb-5 border-b border-[#36f5cf]/10',
//         }}
//       />
//       <Paragraph.List
//         label="Total APY" 
//         // value={`${numberFormat(props.data.apy)} %`}
//         value={`${pureNumberFormat(dropdownArr.reduce((res: number, curr: IBaseBalance) => res + Number(curr.interest_rate) * 100, 0))} %`}
//         classOverride={{
//           container: 'flex-1 pt-4 pb-5 border-b border-[#36f5cf]/10',
//         }}
//       />
//       {/* <CustomProgress 
//         headerLabels={['Current:', 'Max:']}
//         headerValues={['$0', '$0']}
//         current="0"
//         limit="80"
//         classOverride={{
//           container: 'mt-4 mb-3',
//           text: 'text-[13px]'
//         }}
//       /> */}
//       {/* <Paragraph.List
//         label="Supply balance (USDT)" 
//         value={(
//           <div className="flex items-center gap-1">
//             {!amount || amount <= 0 ? (
//               <Typography variant="label-medium" className="text-[13px] leading-[1.6rem] font-medium">$0</Typography>
//             ) : (
//               <>
//                 <Typography variant="label-medium" className="text-[13px] leading-[1.6rem] font-medium">$0</Typography>
//                 <Avatar icon={<ArrowRightIcon />} className="w-5"/>
//                 <Typography variant="label-medium" className="text-[13px] leading-[1.6rem] font-medium">{`$${amount}`}</Typography>
//               </>
//             )}
//           </div>
//         )}
//         classOverride={{
//           container: 'flex-1 py-[10px]',
//         }}
//       />
//       <Paragraph.List
//         label="Borrow limit" 
//         value={numberFormat(Number(props.data.total_supply) * 0.8)}
//         classOverride={{
//           container: 'flex-1 py-[10px]',
//         }}
//       />
//       <Paragraph.List
//         label="Daily earnings" 
//         value={(
//           <div className="flex items-center gap-1">
//             {!amount || amount <= 0 ? (
//               <Typography variant="label-medium" className="text-[13px] leading-[1.6rem] font-medium">$0</Typography>
//             ) : (
//               <>
//                 <Typography variant="label-medium" className="text-[13px] leading-[1.6rem] font-medium">$0</Typography>
//                 <Avatar icon={<ArrowRightIcon />} className="w-5"/>
//                 <Typography variant="label-medium" className="text-[13px] leading-[1.6rem] font-medium">{`$${amount}`}</Typography>
//               </>
//             )}
//           </div>
//         )}
//         classOverride={{
//           container: 'flex-1 py-[10px]',
//         }}
//       /> */}

//       {/* Button group */}
//       <div className="flex flex-col gap-6">
//         {loading ? (
//           <div className="flex flex-1 justify-center items-center bg-[#0aab8b] rounded-lg py-[14px]">
//             <TailSpin
//               visible={true}
//               height="20"
//               width="20"
//               color="#fff"
//               ariaLabel="tail-spin-loading"
//               wrapperStyle={{}}
//               wrapperClass=""
//             />
//           </div>
//         ) : !selected || Number(selected.balance) <= 0 ? (
//       // {!amount || amount <= 0 || amount > Number(balance?.amount ?? 0) ? (
//         <>
//           <div className="flex flex-col gap-2.5 mt-8 ">
//             <Button.Basic 
//               label="Enter valid amount"
//               className={twMerge(
//                 "w-full bg-[#36f5cf]/10",
//                 // 'hover:bg-[#0aab8b]'
//               )}
//               onClick={() => {}}
//             />
//           </div>
//         </>
//       ) : (
//         <Button.Basic 
//           label="Borrow"
//           className={twMerge(
//             "w-full bg-[#36f5cf]/10",
//             // inscribed && 'bg-[#0aab8b]',
//           )}
//           onClick={handleBorrow}
//         />
//       )}
//       </div>
//     </div>
//   )
// }