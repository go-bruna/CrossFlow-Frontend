// This table constant variable should be updated by the response from backend.

import { BitcoinIMG, EthereumIMG } from "@/assets/icons/png"
import { ITokenBaseInfo } from "@/types/interfaces"

export type IPoolProps = {
  fromIcon: string
  toIcon: string
  fromToken: string
  toToken: string
  fee: string
}
export type ITableProps = {
  pool: IPoolProps
  tvl: string
  volume1: string
  volume2: string
  apy: string
}

export const TABLE_DATA = [
  {
    pool: {
      fromIcon: BitcoinIMG,
      toIcon: EthereumIMG,
      fromToken: 'BTC',
      toToken: 'USIC',
      fee: '0.3%'
    },
    tvl: '$324.5M',
    volume1: '$1.5M',
    volume2: '$103.5M',
    apy: '12.3%'
  },
  {
    pool: {
      fromIcon: BitcoinIMG,
      toIcon: EthereumIMG,
      fromToken: 'BTC',
      toToken: 'USIC',
      fee: '0.3%'
    },
    tvl: '$324.5M',
    volume1: '$1.5M',
    volume2: '$103.5M',
    apy: '12.3%'
  },
  {
    pool: {
      fromIcon: BitcoinIMG,
      toIcon: EthereumIMG,
      fromToken: 'BTC',
      toToken: 'USIC',
      fee: '0.3%'
    },
    tvl: '$324.5M',
    volume1: '$1.5M',
    volume2: '$103.5M',
    apy: '12.3%'
  },
  {
    pool: {
      fromIcon: BitcoinIMG,
      toIcon: EthereumIMG,
      fromToken: 'BTC',
      toToken: 'USIC',
      fee: '0.3%'
    },
    tvl: '$324.5M',
    volume1: '$1.5M',
    volume2: '$103.5M',
    apy: '12.3%'
  },
]


export type ITransactionDataProps = {
  maker: string
  token0: ITokenBaseInfo
  token1: ITokenBaseInfo
  amount: string
  time: string
}
export const TRANSACTION_DATA = [
  {
    maker: 'OxA69b...e78C',
    token0: {
      amount: 52,
      token: 'USIC',
      icon: EthereumIMG,
    },
    token1: {
      amount: 2.33,
      token: 'BTC',
      icon: BitcoinIMG,
    },
    amount: '$103.5M',
    time: '1 minute ago'
  },
  {
    maker: 'OxA69b...e78C',
    token0: {
      amount: 52,
      token: 'USIC',
      icon: EthereumIMG,
    },
    token1: {
      amount: 2.33,
      token: 'BTC',
      icon: BitcoinIMG,
    },
    amount: '$103.5M',
    time: '1 minute ago'
  },
  {
    maker: 'OxA69b...e78C',
    token0: {
      amount: 52,
      token: 'USIC',
      icon: EthereumIMG,
    },
    token1: {
      amount: '2.33',
      token: 'BTC',
      icon: BitcoinIMG,
    },
    amount: '$103.5M',
    time: '1 minute ago'
  },
  {
    maker: 'OxA69b...e78C',
    token0: {
      amount: 52,
      token: 'USIC',
      icon: EthereumIMG,
    },
    token1: {
      amount: '2.33',
      token: 'BTC',
      icon: BitcoinIMG,
    },
    amount: '$103.5M',
    time: '1 minute ago'
  },
  {
    maker: 'OxA69b...e78C',
    token0: {
      amount: 52,
      token: 'USIC',
      icon: EthereumIMG,
    },
    token1: {
      amount: '2.33',
      token: 'BTC',
      icon: BitcoinIMG,
    },
    amount: '$103.5M',
    time: '1 minute ago'
  },
]