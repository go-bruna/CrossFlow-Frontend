import { IWeb3Context } from '@/types/context/web3';
import { createContext } from 'react'

const initialState = {
  approveUSDT: () => { },
};

export const Web3Context = createContext<IWeb3Context>(
  initialState
);

Web3Context.displayName = 'Web3Context'
