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
  approveUSDT: Function,
}