import React from 'react'
import { Box, Button, ButtonGroup, Container, Text,Tabs,TabList,TabPanels,TabPanel,Tab } from '@chakra-ui/react'
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'
import { useNavigate } from 'react-router-dom'
import { useState ,useEffect} from 'react'

const Home = () => {

  const navigate=useNavigate();
  useEffect(() => {
    const user=JSON.parse(localStorage.getItem('userInfo'))
  if(user){
    navigate('/chatpage')
  }
}, [navigate])
  

  return (
    <Container maxW='xl' centerContent>
      <Box
        d='flex'
        justifyContent="center"
        p={3}
        w="100%"
        bg="#00000085"
        m="40px 0 15px 0"
        borderRadius="lg"
        shadow="0 0 10px white"
        textAlign="center"
      >
        <Text color="White" m="auto" alignItems="center">
          Chating Start
        </Text>
      </Box>
      <Box
        w="100%"
        bg="#00000085"
        p={3}
        borderRadius="lg"
        shadow="0 0 10px white"
      >
        <Tabs isFitted variant='enclosed' colorScheme='green'>
          <TabList mb="1em">
            <Tab color="white" width="50%">Login</Tab>
            <Tab color="white" width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>

      </Box>
    </Container>
  )
}

export default Home