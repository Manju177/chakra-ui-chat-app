import { Avatar, Badge, Box, Flex, Text } from '@chakra-ui/react'
import { SmallCloseIcon} from '@chakra-ui/icons'
import React from 'react'

function UserBadge({userVal,handleFunction}) {
    console.log('userBadge',userVal)
  return (
  <Box m='10px' gap='5px' alignItems='center' display='flex' >
  <Avatar   size='xs' src={userVal.pic}  />
    <Text >
       {userVal.name}
      <SmallCloseIcon color='#c14a4a' onClick={handleFunction} cursor='pointer'/>
      </Text>
  </Box>
    )
}

export default UserBadge