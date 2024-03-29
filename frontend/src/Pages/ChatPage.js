import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { ChatState } from '../Context/ChatProvider'
import SideDrawer from '../components/miscellaneous/SideDrawer'
import Mychat from '../components/miscellaneous/Mychat'
import ChatList from '../components/miscellaneous/ChatList'
import { Box } from '@chakra-ui/layout'

const ChatPage=()=>{
  const {user}=ChatState()
  const [fetchAgain,setFetchAgain]=useState()
  console.log(user)
  
  return(
  <div style={{width:"100%"}}>
    {user&& <SideDrawer/>}
      <Box
      display='flex'
      justifyContent='space-between'
      w='100%'
      h='93vh'
      p='10px'
      >
{user&&<Mychat fetchAgain={fetchAgain}/>}
        {user&& <ChatList setFetchAgain={setFetchAgain} fetchAgain={fetchAgain}/>}
        
      </Box>
  </div>
  )
}
export default ChatPage