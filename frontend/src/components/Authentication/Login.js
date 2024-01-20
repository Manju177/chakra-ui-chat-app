import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';

function Login() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpwd, setConfirmpwd] = useState();
    const [show, setShow] = useState(false)
    const [confirmshow, setconfirmShow] = useState(false)

    const showFunction = () => {
        setShow(!show)
    }
    const uploadImage = (pics) => {

    }
    const handleSubmit=()=>{

    }
    const handleGuestClick=()=>{

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
    <Button colorScheme='whatsapp' variant='solid' onClick={handleSubmit} width="100%">
        Login
    </Button>
    <Button colorScheme='red' variant='outline'  onClick={handleGuestClick} width="100%">
     Guest User
    </Button>

</VStack>
  )
}

export default Login