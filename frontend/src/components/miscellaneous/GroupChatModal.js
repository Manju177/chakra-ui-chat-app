import { Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay,Button,ModalBody,ModalFooter,useDisclosure, useToast, FormControl, Input,Box } from '@chakra-ui/react'
import React,{useState} from 'react'
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';
import UserList from '../UserList/UserList';
import UserBadge from '../UserList/UserBadge';

function GroupChatModal({children}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const[grpChatName,setGrpChatName]=useState();
    const[selectedUser,setSelectedUser]=useState([]);
    const[search,setSearch]=useState("");
    const[searchResult,setSearchResult]=useState([]);
    const[loading,setLoading]=useState(false)
    const toast=useToast();
    const {user,chats,setChats}=ChatState()
    console.log('searchResult',searchResult)
    const handleSearch=async (searchuser)=>{
        if(!searchuser){
            return;
        }
        try {
            setLoading(true)
            const config={
                headers:{
                    Authorization: `Bearer ${user.token}`
                }
            }
            const {data}= await axios.get(`api/user?search=${searchuser}`,config)
            console.log('searchData',data)
            setLoading(false)
            setSearchResult(data);
        } catch (error) {
            setLoading(false)
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

    const handleSubmit=async()=>{
        if(!grpChatName || !selectedUser){
            toast({
                title: 'Please Fill Mandatory Field',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top-left'
            })
            return;

        }
       try {
        const config={
            headers:{
                Authorization: `Bearer ${user.token}`
            }
        }
        const {data}= await axios.post(`/api/chat/group`,{name:grpChatName,users:JSON.stringify(selectedUser.map((u)=>u._id))},config)
        setChats([data,...chats])
        onClose();
        toast({
            title: 'New Group is created!', 
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-left'
        })
       } catch (error) {
        toast({
            title: 'Failed to Create a group!', 
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-left'
        })
       } 


    }

    const handleDelete=(action)=>{
        console.log('action',action)
        if(selectedUser.includes(action)){
            setSelectedUser(selectedUser.filter(val=>val._id!==action._id))
        }else{
            setSelectedUser([...selectedUser,action])
        }

    }
    const handleGroup=(user)=>{
        console.log('user',selectedUser,user)
       if(selectedUser.includes(user)){
        toast({
            title: 'User already added',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: 'top-left'
        })
        return;
       }
       setSelectedUser([...selectedUser,user])

    }

  return (
    <>
    <span onClick={onOpen}>{children}</span>
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay/>
    <ModalContent>
      <ModalHeader>Create Group Chat</ModalHeader>
      <ModalCloseButton />
      <ModalBody d='flex' flexDir='column' alignItems='center'>
        <FormControl>
            <Input
              type="text"
              placeholder="Enter Group Name"
              onChange={(e)=>setGrpChatName(e.target.value)}
              value={grpChatName}
              mb={'3'}
            />
              <Input
              placeholder="Add Users eg: Ram, Laxman, Hanuman..."
              onChange={(e)=>handleSearch(e.target.value)}
              mb={'3'}
            />
         <Box display='flex' flexDir='column' >
            {
                 selectedUser.map((val)=>{
                    return(
                        <>
                        <UserBadge  userVal={val} handleFunction={()=>handleDelete(val)} key={val._id}/>
                       </>
                    )
                })
            }
        </Box>

            {
                loading?<div>Loading...</div>:searchResult?.slice(0,4).map((user)=>
                <UserList key={user._id} user={user} handleFunction={()=>handleGroup(user)}/>
                )
            }
           

        </FormControl>
      </ModalBody >

      <ModalFooter>
        <Button colorScheme='whatsapp' mr={3} onClick={handleSubmit}>
          Create Group
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  </>
  )
}

export default GroupChatModal