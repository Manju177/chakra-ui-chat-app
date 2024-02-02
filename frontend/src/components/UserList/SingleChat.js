import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box,IconButton,Text } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { getSender,getSenderDetails } from '../Config/Config'
import ProfileModal from '../miscellaneous/ProfileModal'
import UpdateGroupChatModal from '../miscellaneous/UpdateGroupChatModal'

function SingleChat({fetchAgain,setFetchAgain}) {
    const {user,selectedChat,setSelectedChat}=ChatState()
    const[grpChatName,setGrpChatName]=useState();
    const[selectedUser,setSelectedUser]=useState([]);
    const[search,setSearch]=useState("");
    const[searchResult,setSearchResult]=useState([]);
    const[loading,setLoading]=useState(false)
  return (
    <>{
        selectedChat?<>
        <Text
        fontSize={{base:'28px', md:'30px'}}
        pb={3}
        px={2}
        w={'100%'}
        fontFamily='Work sans'
        display='flex'
        justifyContent={{base:'space-between'}}
        alignItems='center'
        >
            <IconButton
            display={{base:'flex', md:"none"}}
            icon={<ArrowBackIcon/>}
            onClick={()=>{setSelectedChat("")}}
            />
            {!selectedChat.isGroupChat ?(
                <>
                {getSender(user,selectedChat.users)}
                <ProfileModal user={getSenderDetails(user,selectedChat.users)}/>
                </>
            ):(
                <>
                {selectedChat.chatName.toUpperCase()}
                {
                    <UpdateGroupChatModal
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                    />
                }
                </>
            )
            }
            

        </Text>
        
        <Box 
             display={'flex'}
             flexDir='column'
             justifyContent='flex-end'
             p={3}
             bg="#E8E8E8"
             w="100%"
             h="91%" 
             borderRadius="lg"
             overflowY="hidden"            
            >
                
                
            </Box>
        </>:(
            <Box display={'flex'} alignItems='center' h='100%' justifyContent='center'>
                <Text pb={3} fontFamily='Woek sans' fontSize='3xl'>
                    Click on user to start a chat
                </Text>
            </Box>
        )
    }</>
  )
}

export default SingleChat