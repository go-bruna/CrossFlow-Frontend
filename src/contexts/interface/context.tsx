import { DrawerProps } from '@/types/context/drawer'
import { ModalProps } from '@/types/context/modal'
import { createContext } from 'react'


interface IContext {
  setDrawer: (props: DrawerProps) => void
  setModal: (props: ModalProps) => void
}
export const InterfaceContext = createContext<IContext>({
  setDrawer: () => {},
  setModal: () => {}
})
InterfaceContext.displayName = 'InterfaceContext'
