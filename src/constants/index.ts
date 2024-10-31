import { IToken } from "@/types/interfaces";
import veORBKAbi from "@/abi/veORBK.json";
import ORBKAbi from "@/abi/ORBK.json";

export const CHAIN_ID = Number(import.meta.env.VITE_CHAIN_ID) || 11155111;
// export const CHAIN_ID = Number(import.meta.env.VITE_CHAIN_ID) || 17000
// forcing push
export const TEST_MODE = CHAIN_ID === 1 ? false : true;
export const CHAIN_SCAN = TEST_MODE
	? "https://sepolia.etherscan.io"
	: // ? 'https://holesky.etherscan.io'
		"https://etherscan.io";

export const ORDS_PAIR = {
	address: "0xfe9e7931e55c514c33d489c88582fa36e84bd8e3",
	// abi: pairAbi.abi,
	abi: null,
};

export const TOKEN_ARRAY: IToken[] = [
	{
		name: "VEORBK",
		address: TEST_MODE
			? "0xec99b4A30b35Eeda23A17b903b4416A07683AfDc"
			: "0xe60dE41EB1908251185fD54540B277005090c848",
		abi: veORBKAbi.abi,
	},
	{
		name: "ORBK",
		address: TEST_MODE
			? "0x9be34aF8a3E9041359331cDFf3d286b273828895"
			: "0xCe6E54DaA1ea95fb3530859d69D4bdb978dd821b",
		abi: ORBKAbi.abi,
	},
];

export const TOKEN_LIST: { [key: string]: IToken } = {
	VEORBK: TOKEN_ARRAY[0],
	ORBK: TOKEN_ARRAY[1],
	// REWARDS: TOKEN_ARRAY[2],
};

export type TokenSymbolType = keyof typeof TOKEN_LIST;

export const ONE_DAY = 24 * 60 * 60; // 1 Day to Seconds
export const ONE_WEEK = 7 * ONE_DAY; // 1 Week to Seconds
export const ONE_MONTH = 30 * ONE_DAY; // 1 Month(30 Days) to Seconds
export const ONE_YEAR = 12 * ONE_MONTH; // 1 Year(12 Months) to Seconds

export const DURATIONS_TIME = [
	{
		minLabel: "1 Month",
		maxLabel: "3 Months",
		minDuration: 1 * ONE_MONTH,
		maxDuration: 3 * ONE_MONTH,
		period: 3,
		bonusRate: 20,
		burnRate: 20,
		index: 0,
	},
	{
		minLabel: "3 Months",
		maxLabel: "6 Months",
		minDuration: 3 * ONE_MONTH,
		maxDuration: 6 * ONE_MONTH,
		bonusRate: 35,
		burnRate: 30,
		period: 6,
		index: 1,
	},
	{
		minLabel: "6 Months",
		maxLabel: "12 Months",
		minDuration: 6 * ONE_MONTH,
		maxDuration: 12 * ONE_MONTH,
		bonusRate: 65,
		burnRate: 40,
		period: 12,
		index: 2,
	},
	{
		minLabel: "12 Months",
		maxLabel: "24 Months",
		minDuration: 12 * ONE_MONTH,
		maxDuration: 24 * ONE_MONTH,
		bonusRate: 65,
		burnRate: 50,
		period: 24,
		index: 3,
	},
];


export const MAIN_POOLS_ITEM_DATA = [
	'Total supply',
	'Total Borrow',
	'Available Liquidity',
	'Daily ORBK Rewards',
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