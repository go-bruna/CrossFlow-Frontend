import { useContext } from 'react'
import { TxModalContext } from './context'

export const useTxModalState = () => {
  const context = useContext(TxModalContext)

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return context
}