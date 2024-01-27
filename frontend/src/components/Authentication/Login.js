import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';
import { useToast } from '@chakra-ui/react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function Login() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpwd, setConfirmpwd] = useState();
    const [show, setShow] = useState(false)
    const [confirmshow, setconfirmShow] = useState(false)
    const toast = useToast()
    const [loading,setLoading]=useState(false)
    let navigate = useNavigate();

    const showFunction = () => {
        setShow(!show)
    }
    const uploadImage = (pics) => {

    }
    const handleSubmit=async()=>{
        setLoading(true)
        if(!email||!password){
            toast({
                title: 'Please FIll all the Feilds',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:"top"
              })
              setLoading(false)
              return;
        }
        try {
            const config={
                headers:{
                    "Content-Type":"application/json"
              },

            };
            const {data}=await axios.post("http://localhost:3000/api/user/login",{email,password},config);
            toast({
                title: 'Login Successful',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position:"top"
              });
              localStorage.setItem("userInfo",JSON.stringify(data))
              setLoading(false)
              navigate('/chatpage',{replace: true})
        } catch (error) {
            console.log('error',error)
            toast({
                title: 'Error!',
                description:error?.response?.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position:"top"
              });
              setLoading(false)
        }

    }

  return (
    <VStack spacing="5px">
    <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
            type='text'
            placeholder='Enter Your Email'
            onChange={(e) => setEmail(e.target.value)}
        />
    </FormControl>
    <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
            <Input
                type={show ? "text" : "password"}
                placeholder='Enter Your Password'
                onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement>
                <Button h="1.75rem" size="sm" p="2px" onClick={showFunction} colorScheme='#00000085' border="none" >
                    {show ? "Hide" : "Show"}
                </Button>
            </InputRightElement>
        </InputGroup>
    </FormControl>

=
    <br/>
    <Button colorScheme='whatsapp' variant='solid' onClick={handleSubmit} width="100%" isLoading={loading}>
        Login
    </Button>
    <Button colorScheme='red' variant='outline'  onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
        width="100%">
     Guest User
    </Button>

</VStack>
  )
}

export default Login