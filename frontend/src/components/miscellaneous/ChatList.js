import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box } from '@chakra-ui/react'
import SingleChat from '../UserList/SingleChat'

function ChatList({fetchAgain,setFetchAgain}) {

  const {selectedChat}=ChatState()
  return (
    <Box d={{base:selectedChat?"flex":'none', md:'flex'}}
    alignItems='center'
    flexDirection='column'
    p={3}
    bg="white"
    w={{ base: "100%", md: "68%" }}
    borderRadius="lg"
    borderWidth="1px"
    color='black'
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
    </Box>
  )
}

export default ChatList