import { useContext } from 'react'

import { InterfaceContext } from './context'

export const useModal = () => {
  const context = useContext(InterfaceContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}
