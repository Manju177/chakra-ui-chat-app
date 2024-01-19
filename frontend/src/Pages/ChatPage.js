import React,{useEffect, useState} from 'react'
import axios from 'axios'

const ChatPage=()=>{
  const [data,setData]=useState([])
  useEffect(() => {
    const fetchData=async()=>{
      try {
        const {data}=await axios.get("/api/chat")
        setData(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
      
    }
    fetchData()
  }, [])
  
  return(
  <div>
    {data.map((chat)=>{
      return(
        <div key={chat._id}>
          {chat.chatName}
        </div>
      )
    })}
  </div>
  )
}
export default ChatPage