import { IWeb3Context, TX_TYPE } from '@/types/context/web3';
import { createContext } from 'react'

const initialState = {
  loading: false,
  pending: false,
  completed: false,
  txType: TX_TYPE.NONE,
  balance: {},
  allowance: 0,
  tvl: 0,
  userStakes: [],
  redeemInfo: {},
  redeemStakes: [],
  averageAPR: 0n,
  periodStaked: 0,
  totalBurnt: 0,
  totalRewards: 0,

  updateUserInfo: () => { },
  setRedeemStakes: () => { },
  writeApproveStake: () => { },
  writeStake: () => { },
  writeRedeemByIndex: () => { },
  writeFinalRedeem: () => { },
  writeClaim: () => {},
  getPeriodStakingAmount: () => { },
  getAPRAndRewards: () => { },
  getTotalStakedInPeriod: () => { },
  // setTotalBurnt: () => { },
  // setAverageAPR: () => { },
  // setUserStakes: () => { },
  // setRedeemInfo: () => { },
  // setTxType: () => { },
};

export const Web3Context = createContext<IWeb3Context>(
  initialState
);

Web3Context.displayName = 'Web3Context'
