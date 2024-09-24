import { useContext } from 'react'

import { InterfaceContext } from './context'

export const useDrawer = () => {
  const context = useContext(InterfaceContext)
  if (!context) {
    throw new Error('useDrawer must be used within a DrawerProvider')
  }
  return context
}
