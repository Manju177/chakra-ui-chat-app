import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box, FormControl, IconButton, Input, Spinner, Text, createMultiStyleConfigHelpers, useToast } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { getSender, getSenderDetails } from '../Config/Config'
import ProfileModal from '../miscellaneous/ProfileModal'
import UpdateGroupChatModal from '../miscellaneous/UpdateGroupChatModal'
import axios from 'axios'
import AllChats from './AllChats'
import io from 'socket.io-client'
import Lottie from "react-lottie";
import animationData from "../../animations/typing.json";

const ENDPOINT = "http://localhost:5000"
var socket, selectedChatCompare;

function SingleChat({ fetchAgain, setFetchAgain }) {
    const { user, selectedChat, setSelectedChat,notification,setNotification } = ChatState()
    const [grpChatName, setGrpChatName] = useState();
    const [selectedUser, setSelectedUser] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState()
    const [messages, setMessages] = useState([])
    const [socketConnected, setSocketConnected] = useState(false)
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    const toast = useToast()

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };

    const handleChange = (e) => {
        setNewMessage(e.target.value)
        if (!typing) {
            setTyping(true);
            socket.emit("typing", selectedChat._id);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat._id);
                setTyping(false);
            }
        }, timerLength);
    }

    let style = {
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
        scrollbarWidth: "none"
    }
    useEffect(() => {

        fetchMessages()
        selectedChatCompare = selectedChat;
    }, [selectedChat])





    const fetchMessages = async () => {
        if (!selectedChat) return;
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            setLoading(true);
            const { data } = await axios.get(`/api/message/${selectedChat._id}`, config)
            console.log('dataahaha', data)
            setMessages(data)
            setLoading(false);
            socket.emit('join chat', selectedChat._id)
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

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit('setup', user);
        socket.on('connected', () => {
            setSocketConnected(true)
        })
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));
    }, [])

    useEffect(() => {
        socket.on('message recived', (newmessageRecived) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newmessageRecived.chat._id) {
                if(!notification.includes(newmessageRecived)){
                    setNotification([newmessageRecived,...notification])
                    setFetchAgain(!fetchAgain)
                }
            } else {
                setMessages([...messages, newmessageRecived])
            }
        })
    })



    const handleEnter = async (event) => {
        if (event.key === 'Enter' && newMessage) {
            socket.emit("stop typing", selectedChat._id);
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
                socket.emit('new message', data)
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
                            <AllChats messages={messages} />

                        </div>}

                    <FormControl onKeyDown={handleEnter} id="first-name"
                        isRequired
                        mt={3}>
                        {istyping ? (
                            <div>
                                <Lottie
                                    options={defaultOptions}
                                    // height={50}
                                    width={70}
                                    style={{ marginBottom: 15, marginLeft: 0 }}
                                />
                            </div>
                        ) : (
                            <></>
                        )}
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