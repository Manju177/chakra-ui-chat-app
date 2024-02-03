import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box, FormControl, IconButton, Input, Spinner, Text, createMultiStyleConfigHelpers, useToast } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { getSender, getSenderDetails } from '../Config/Config'
import ProfileModal from '../miscellaneous/ProfileModal'
import UpdateGroupChatModal from '../miscellaneous/UpdateGroupChatModal'
import axios from 'axios'
import AllChats from './AllChats'

function SingleChat({ fetchAgain, setFetchAgain }) {
    const { user, selectedChat, setSelectedChat } = ChatState()
    const [grpChatName, setGrpChatName] = useState();
    const [selectedUser, setSelectedUser] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState()
    const [messages, setMessages] = useState([])
    const toast = useToast()

    const handleChange = (e) => {
        setNewMessage(e.target.value)
    }

    let style = {
        display:'flex',
        flexDirection:'column',
        overflowY:'scroll',
        scrollbarWidth:"none"
    }
useEffect(() =>{

    fetchMessages()
},[selectedChat])
const fetchMessages=async()=>{
    if(!selectedChat)return;
    try {
        const config = {
            headers: {
                 Authorization: `Bearer ${user.token}`,
            },
          };
        setLoading(true);
        const {data}=await axios.get(`/api/message/${selectedChat._id}`,config)
        console.log('dataahaha',data)
        setMessages(data)
        setLoading(false);
    } catch (error) {
        toast({
            title: "Error Occured!",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
        setLoading(false);
        
    }

}
    

    const handleEnter = async (event) => {
        if (event.key === 'Enter' && newMessage) {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                     Authorization: `Bearer ${user.token}`,
                },
              };
                setNewMessage("")
                const { data } = await axios.post("/api/message", {
                    content: newMessage,
                    chatId: selectedChat._id,
                }, config)
                console.log('chataData', data)
                setMessages([...messages, data])
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    }
    }
    return (
        <>{
            selectedChat ? <>
                <Text
                    fontSize={{ base: '28px', md: '30px' }}
                    pb={3}
                    px={2}
                    w={'100%'}
                    fontFamily='Work sans'
                    display='flex'
                    justifyContent={{ base: 'space-between' }}
                    alignItems='center'
                >
                    <IconButton
                        display={{ base: 'flex', md: "none" }}
                        icon={<ArrowBackIcon />}
                        onClick={() => { setSelectedChat("") }}
                    />
                    {!selectedChat.isGroupChat ? (
                        <>
                            {getSender(user, selectedChat.users)}
                            <ProfileModal user={getSenderDetails(user, selectedChat.users)} />
                        </>
                    ) : (
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
                    {
                        loading ? <Spinner
                            size='xl'
                            margin='auto'

                        /> : <div style={style}>
                            <AllChats messages={messages}/>

                            </div>}

                            <FormControl onKeyDown={handleEnter} isRequired>
                                <Input
                                    value={newMessage}
                                    onChange={handleChange}
                                    placeholder="Type a message"
                                />

                            </FormControl>
                        
                    


                </Box>
            </> : (
                <Box display={'flex'} alignItems='center' h='100%' justifyContent='center'>
                    <Text pb={3} fontFamily='Woek sans' fontSize='3xl'>
                        <marquee width="100%" direction="left" height="100px">Click on user to start a chat</marquee>
                    </Text>
                </Box>
            )
        }</>
    )
}

export default SingleChat