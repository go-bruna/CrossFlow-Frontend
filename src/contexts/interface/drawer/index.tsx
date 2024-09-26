import { useEffect, useState } from 'react'
import { DrawerProps } from '@/types/context/drawer'
import Drawer from '@/components/drawer'

interface Props {
  content: DrawerProps | null
}
export const DrawerContent = (props: Props) => {
  const [_selectedDrawer, setSelectedDrawer] = useState<DrawerProps | null>(
    props.content
  )
  const [_visible, setVisible] = useState<boolean>(false)

  useEffect(() => {
    // Check if anything has changed
    if (
      (_selectedDrawer === null && props.content !== null) ||
      (_selectedDrawer !== null && props.content === null) ||
      _selectedDrawer?.id !== props.content?.id
    ) {
      // Check if we're currently displaying something
      if (_selectedDrawer !== null) {
        // We are displaying something so lets close that
        setVisible(false)
      }

      // Set the newly selected drawer
      setSelectedDrawer(props.content)
    }
  }, [props.content])

  useEffect(() => {
    // This will be called after a selected drawer has been changed
    // meaning the drawer will be rendered but not visible yet
    // Lets check that the selected drawer isn't null and if not
    // we'll show the drawer now
    if (_selectedDrawer) {
      setVisible(true)
    }
  }, [_selectedDrawer])

  const onClose = () => {
    // Hide the drawer first
    setVisible(false)

    // Wait a delay and then clear the drawer from our state
    setTimeout(() => {
      setSelectedDrawer(null)
    }, 300)
  }

  // If there is no selected drawer then we can
  // return null
  if (!_selectedDrawer) {
    return null
  }

  // Otherwise we'll figure out which to display
  // depending on the id of the props
  switch (_selectedDrawer.id) {
    case 'CONNECT_WALLET':
      return (
        <Drawer.ConnectWallet
          {..._selectedDrawer}
          visible={_visible}
          onClose={onClose}
        />
      )
    case 'POOL':
      return (
        <Drawer.Pool
          {..._selectedDrawer}
          visible={_visible}
          onClose={onClose}
        />
      )
    
    case 'STAKE':
      return (
        <Drawer.Stake
          {..._selectedDrawer}
          visible={_visible}
          onClose={onClose}
        />
      )

    case 'WITHDRAW':
      return (
        <Drawer.Withdraw
          {..._selectedDrawer}
          visible={_visible}
          onClose={onClose}
        />
      )
    default:
      return <></>
  }
}
