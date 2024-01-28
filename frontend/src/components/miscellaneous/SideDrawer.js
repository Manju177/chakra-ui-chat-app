import { Box, Button, MenuButton, Text, Tooltip,Menu,MenuList, Avatar, MenuItem, MenuDivider, Drawer,useDisclosure,DrawerOverlay,DrawerContent,DrawerCloseButton,DrawerHeader,DrawerBody,DrawerFooter, Input, useToast, Spinner } from '@chakra-ui/react'
import React, { useState } from 'react'
import { SearchIcon,BellIcon,ChevronDownIcon } from '@chakra-ui/icons'
import { ChatState } from '../../Context/ChatProvider'
import ProfileModal from './ProfileModal'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ChatLoading from '../ChatLoading/ChatLoading'
import UserList from '../UserList/UserList'

function SideDrawer() {
   const [search,setSearch]=useState("")
   const [searchResult,setSearchResult]=useState([])
   const [chatLoading,setChatLoading]=useState(false)
   const [loading,setLoading]=useState(false)
   const {user,selectedChat,setSelectedChat,chats,setChats}=ChatState()
   const navigate=useNavigate()
   const { isOpen, onOpen, onClose } = useDisclosure()
   const toast=useToast()
   console.log('userSlide',user)

   const logOutHandler=()=>{
       localStorage.removeItem('userInfo')
       navigate('/')
   }

   const accessChat =async(userId)=>{
    console.log('userid',userId)
   
    try {
        setChatLoading(true)
        const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          };
        const {data} = await axios.post(`/api/chat`,{userId}, config);
        console.log('data',data);
        if(!chats.find((c)=>c._id ===data._id)) setChats([data,...chats])
        setChatLoading(false)
        setSelectedChat(data)
        onClose();
        
    } catch (error) {
        console.log('error',error);
        toast({
            title: 'Error fetching the chat',
            description:error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-left'
        });
    }    
}

   const handleSearch=async ()=>{
    if(!search){
        toast({
            title: 'Please enter a search term',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: 'top-left'
        })
        return;
    }
        try {
            setLoading(true)
            const config={
                headers:{
                    Authorization: `Bearer ${user.token}`,

                },
            }
            const {data}=await axios.get(`/api/user?search=${search}`,config)
            setLoading(false)
            setSearchResult(data);
        } catch (error) {
            toast({
                title: 'Error Occured',
                description:"Failed to Load the Search Results",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-left'
            })
            
        }
   }

  return (
    <>
    <Box
    display="flex"
    justifyContent='space-between'
    w="100%"
    bg="#f7f9f963"
    boxShadow="0 0 20px rgba(0,0,0)"
    p="5px 10px 5px 10px"
    alignItems='center'
    >
        <Tooltip label="Search Users" hasArrow placement='bottom-end'>
        <Button variant='ghost' onClick={onOpen} >
        <SearchIcon color="black" />
        <Text as='cite' color='black' d={{base:"none", md:'flex'}} px='4'>Search Users</Text>
        </Button>
        </Tooltip>
        <div>
            <Menu>
            <MenuButton p={1}>
                <BellIcon fontSize="2xl" m={1}/>
            </MenuButton>
            <Menu>
                <MenuButton as={Button} background='none' rightIcon={<ChevronDownIcon />}>
                    <Avatar size="sm" cursor='pointer' name={user.name} src={user.pic}/>

                </MenuButton>
                <MenuList color='black'>
                    <ProfileModal user={user}>
                    <MenuItem>My Profile</MenuItem>
                    </ProfileModal>
                    <MenuDivider/ >
                    <MenuItem onClick={logOutHandler}>Logout</MenuItem>
                </MenuList>
            </Menu>
            </Menu>
        </div>
    </Box>
    <Drawer placement='left' isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader boarderBottomWidth="1px">
               Search Users
            </DrawerHeader>
            <DrawerBody>
                <Box display='flex' pb={2}>
                    <Input
                     placeholder='Search by name or email'
                     mr={2}
                     value={search}
                     onChange={(e)=>setSearch(e.target.value)}
                    />
                    <Button onClick={handleSearch}><SearchIcon color="black" /></Button>
                </Box>
                {loading ? (
                   <ChatLoading/>
                ):(searchResult?.map(user=>(
                    <UserList key={user._id} user={user} handleFunction={()=>accessChat(user._id)}/>
                )))}
        
             {chatLoading && <Spinner ml="auto" d='flex'/>}
            </DrawerBody>
            {/* <DrawerFooter>
                <Button onClick={onClose}>Close</Button>
            </DrawerFooter> */}
        </DrawerContent>
    </Drawer>
    </>
  )
}

export default SideDrawer