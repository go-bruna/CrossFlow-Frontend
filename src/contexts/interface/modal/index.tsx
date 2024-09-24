import { useEffect, useState } from 'react'

import Modal from '@/components/modal'
import { ModalProps } from '@/types/context/modal'

interface Props {
  content: ModalProps | null
}
export const ModalContent = (props: Props) => {
  const [_selectedModal, setSelectedModal] = useState<ModalProps | null>(
    props.content
  )
  const [_visible, setVisible] = useState<boolean>(false)

  useEffect(() => {
    // Check if anything has changed
    if (
      (_selectedModal === null && props.content !== null) ||
      (_selectedModal !== null && props.content === null) ||
      _selectedModal?.id !== props.content?.id
    ) {
      // Check if we're currently displaying something
      if (_selectedModal !== null) {
        // We are displaying something so lets close that
        setVisible(false)
      }

      // Set the newly selected modal
      setSelectedModal(props.content)
    }
  }, [props.content])

  useEffect(() => {
    // This will be called after a selected modal has been changed
    // meaning the modal will be rendered but not visible yet
    // Lets check that the selected modal isn't null and if not
    // we'll show the modal now
    if (_selectedModal) {
      setVisible(true)
    }
  }, [_selectedModal])

  const onClose = () => {
    // Hide the modal first
    setVisible(false)

    // Wait a delay and then clear the modal from our state
    setTimeout(() => {
      setSelectedModal(null)
    }, 300)
  }

  // If there is no selected modal then we can
  // return null
  if (!_selectedModal) {
    return null
  }

  // Otherwise we'll figure out which to display
  // depending on the id of the props
  switch (_selectedModal.id) {
    case 'CONNECT_WALLET':
      return (
        <Modal.ConnectWallet
          {..._selectedModal}
          visible={_visible}
          onClose={onClose}
        />
      )
    default:
      return <></>
  }
}
