import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function Signup() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpwd, setConfirmpwd] = useState();
    const [show, setShow] = useState(false)
    const [confirmshow, setconfirmShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const[pic,setPic]=useState()
    const toast = useToast()
    let navigate = useNavigate();
     
    const showFunction = () => {
        setShow(!show)
    }
    const uploadImage = (pics) => {
        setLoading(true);
        if(pics===undefined){
            toast({
                title: 'Please Select Image.',
                description:'Bhai Image select maadopaa',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:"top"
              })
              return;
        }
        if(pics.type==="image/jpg" || pics.type==="image/png" ){
            const data=new FormData();
            data.append("file",pics)
            data.append("upload_preset","chatingapp")
            data.append("cloud-name","manjup")
            // data.append('Access-Control-Allow-Origin', 'http://localhost:3000')
            // data.append('Access-Control-Allow-Origin', 'true')
            fetch("https://api.cloudinary.com/v1_1/manjup/image/upload",{
                method:'post',
                body:data,
            }).then((response)=>{
                console.log(response)
                response.json()
            }).then((data)=>{
                console.log("data",data.url.toString())
                setPic(data.url.toString())
                setLoading(false)

            }).catch((error)=>{
                setLoading(false)
                console.log(error)
            })
        }
     else{
        toast({
            title: 'Please Select Image.',
            description:'Bhai Image select maadopaa',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position:"top"
          })
     }


    }
    const handleSubmit=async()=>{
        setLoading(true)
        if(!name||!email||!password||!confirmpwd){
            toast({
                title: 'Please Fill all the Feilds.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:"top"
              })
              setLoading(false)
              return;
        }
        if(password!=confirmpwd){
            toast({
                title: 'Password Do Not Match.',
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
            const {data}=await axios.post("/api/user/",{name,email,password,pic},config);
            toast({
                title: 'Registration Successful',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position:"top"
              });
              localStorage.setItem("userInfo",JSON.stringify(data))
              setLoading(false)
              navigate('/')
        } catch (error) {
            toast({
                title: 'Error!',
                description:error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position:"top"
              });
              setLoading(false)
        }

    }
    const confirmshowFunction = () => {
        setconfirmShow(!confirmshow)
    }
    return (
        <VStack spacing="5px">
            <FormControl id="firstName" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    type='text'
                    placeholder='Enter Your Good Name'
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
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
            <FormControl id="confirmpassword" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input
                        type={confirmshow ? "text" : "password"}
                        placeholder='Confirm Your Password'
                        onChange={(e) => setConfirmpwd(e.target.value)}
                    />
                    <InputRightElement>
                        <Button h="1.75rem" size="sm" p="2px" onClick={confirmshowFunction} colorScheme='#00000085' border="none" >
                            {confirmshow ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="firstName" isRequired>
                <FormLabel>Upload Your Picture</FormLabel>
                <Input
                    type='file'
                    placeholder='Enter Your Good Name'
                    accept='image/'
                    onChange={(e) => uploadImage(e.target.files[0])}
                />
            </FormControl>
            <br/>
            <Button colorScheme='whatsapp' variant='solid' onClick={handleSubmit} width="100%" isLoading={loading}>
                Sign Up
            </Button>

        </VStack>
    )
}

export default Signup