import React, { createContext, useContext, useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const ChatContext=createContext();


function ChatProvider({children}) {
    const[user,setUser]=useState();
    const navigate=useNavigate()
    const [selectedChat,setSelectedChat]=useState()
    const [chats,setChats]=useState([])

    useEffect(() => {
        
        const userInfo=JSON.parse(localStorage.getItem('userInfo'))
        console.log(localStorage.getItem(JSON.stringify("userInfo")))
        setUser(userInfo)
        user??navigate('/',{replace: true})
      
    }, [navigate])
    

  return (
    <ChatContext.Provider value={{user,setUser,selectedChat,setSelectedChat,chats,setChats}}>
      {children}
    </ChatContext.Provider>
  )
}

 export const ChatState=()=>{
   return  useContext(ChatContext)
 }  
export default ChatProvider