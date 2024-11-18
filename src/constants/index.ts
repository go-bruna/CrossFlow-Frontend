import { IToken } from "@/types/interfaces";
import O_USDT_ABI from "@/abi/ORBK.json";

export const CHAIN_ID = Number(import.meta.env.VITE_CHAIN_ID) || 17000
// forcing push
export const TEST_MODE = CHAIN_ID === 1 ? false : true;
export const CHAIN_SCAN = TEST_MODE
	? 'https://holesky.etherscan.io'
	: "https://etherscan.io";


export const O_USDT_TOKEN: IToken = {
	name: "USDT-O",
	address: TEST_MODE
		? "0x94cF752F94bA10d6c93bB033c1e0C746e547899B"
		: "0xe60dE41EB1908251185fD54540B277005090c848",
	abi: O_USDT_ABI.abi,
}



export const MAIN_POOLS_ITEM_DATA = [
	'Total supply',
	'Total Borrow',
	'Available Liquidity',
	'Daily CFN Rewards',
	'Assets',
]

export const ACCOUNT_ITEM_DATA = [
	'Net APY',
	'Daily Earning',
	'Total Supply',
	'Total Borrow',
	'Total Vault Stake',
]

export const GOVERNANCE_ITEM_DATA =[
	'Total Proposals',
	'Voting Power'
]

export const GOVERNANCE_DETAIL_ITEM_DATA =[
	'Yes',
	'No',
	'Abstain',
	'End voting period',
	'Voting Power',
]

export const PROPOSAL_NAV = ['Description', 'Comments']

export const BTC_FEE_RATE = 150 * 1000

export const POOL_AVAILABLE = 'pool_available'
export const POOL_IN_PROGRESS = 'pool_in_progress'