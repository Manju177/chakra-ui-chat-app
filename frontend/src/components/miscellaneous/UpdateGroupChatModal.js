import { IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure,ModalFooter,Button } from '@chakra-ui/react'
import React from 'react'
import {ViewIcon} from '@chakra-ui/icons'
import { ChatState } from '../../Context/ChatProvider'

function UpdateGroupChatModal({fetchAgain,setFetchAgain}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {selectedChat,setSelectedChat,user}=ChatState()
  return (
    <>
 <IconButton display={{base:'flex'}} isOpen={isOpen} icon={<ViewIcon/>} onClick={onOpen}/>
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{selectedChat.chatName}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
      </ModalBody>

    </ModalContent>
  </Modal>
  </>
  )
}

export default UpdateGroupChatModal