import { useCallback, useMemo, useState } from 'react'
import { IContextChildrenProps } from '@/types/context'
import { DrawerProps } from '@/types/context/drawer'
import { DrawerContent } from './drawer'
import { InterfaceContext } from './context'
import { ModalContent } from './modal'
import { ModalProps } from '@/types/context/modal'

export const InterfaceProvider = (props: IContextChildrenProps) => {
  const [_drawerContent, setDrawerContent] = useState<DrawerProps | null>(null)
  const [_modalContent, setModalContent] = useState<ModalProps | null>(null)

  const setDrawer = useCallback((props: DrawerProps | null) => {
    if (_drawerContent !== null && props !== null) {
      setDrawerContent(null)
    }

    setTimeout(() => {
      setDrawerContent(props)
    }, 100)
  }, [])

  const setModal = useCallback((props: ModalProps | null) => {
    if (_modalContent !== null && props !== null) {
      setModalContent(null)
    }

    setTimeout(() => {
      setModalContent(props)
    }, 100)
  }, [])

  const providerValue = useMemo(
    () => ({
      setDrawer,
      setModal,
    }),
    [setDrawer, setModal]
  )

  return (
    <InterfaceContext.Provider value={providerValue}>
      <DrawerContent content={_drawerContent} />
      <ModalContent content={_modalContent} />
      {props.children}
    </InterfaceContext.Provider>
  )
}
