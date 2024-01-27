import { Box, Button, MenuButton, Text, Tooltip,Menu,MenuList, Avatar, MenuItem } from '@chakra-ui/react'
import React, { useState } from 'react'
import { SearchIcon,BellIcon,ChevronDownIcon } from '@chakra-ui/icons'
import { ChatState } from '../../Context/ChatProvider'

function SideDrawer() {
   const [search,setSearch]=useState("")
   const [searchResult,setSearchResult]=useState([])
   const [chatLoading,setChatLoading]=useState()
   const [loading,setLoading]=useState()
   const {user}=ChatState()

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
        <Button variant='ghost' >
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
                    <MenuItem>My Profile</MenuItem>
                    <MenuItem>Logout</MenuItem>
                </MenuList>
            </Menu>
            </Menu>
        </div>
    </Box>
    </>
  )
}

export default SideDrawer