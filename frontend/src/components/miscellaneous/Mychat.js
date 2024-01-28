import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";


function Mychat() {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
  

  const { data } = await axios.get("/api/chat", config);
  setChats(data);
} catch (error) {
  toast({
    title: "Error Occured!",
    description: "Failed to Load the chats",
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "top-left",
  });
}
};

useEffect(() => {
setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
fetchChats();
}, []);


  return (
    <div>Mychat</div>
  )
}

export default Mychat