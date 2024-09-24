export enum TX_TYPE {
  NONE,
  BALANCE,
  APPROVE,
  STAKE,
  REDEEM,
  CLAIMALL,
  FINAL,
}

export interface IBalance {
  [key: string]: number
}

export interface IStake {
  amount: number,
  startBlock: number,
  lastClaimedBlock: number,
  startTime: number,
  lockPeriod: number,
  reward: number,
  burnPercentage: number,
  index: number,
}

export interface IRedeemInfo {
  totalBurned?: number,
  totalRedeemORBK?: number,
  totalRedeemVeORBK?: number,
  totalStaked?: number,
}

export interface IWeb3Context {
  loading: boolean,
  pending: boolean,
  completed: boolean,
  txType: TX_TYPE,
  balance: IBalance,
  allowance: number,
  tvl: number,
  averageAPR: BigInt,
  userStakes: IStake[],
  redeemInfo: IRedeemInfo,
  redeemStakes: number[],
  periodStaked: number,
  totalBurnt: number,
  totalRewards: number,

  updateUserInfo: Function,
  setRedeemStakes: Function,
  writeApproveStake: Function,
  writeStake: Function,
  writeRedeemByIndex: Function,
  writeFinalRedeem: Function,
  getPeriodStakingAmount: Function,
  writeClaim: Function,
  getAPRAndRewards: Function,
  getTotalStakedInPeriod: Function,
}