import { useContext } from 'react'
import { Web3Context } from './context'

export const useWeb3Context = () => {
  const context = useContext(Web3Context)
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return context
}