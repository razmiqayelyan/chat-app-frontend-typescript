import { Avatar, IconButton, LinearProgress, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import Cancel from '@mui/icons-material/Cancel';
import { useDispatch, useSelector } from 'react-redux';
import { userState } from '../../../slice/user/userSlice';
import { chatState, removeMemberFromGroup } from '../../../slice/chat/chatSlice'
import styles from './style'
import { UserType } from '../../../types/userType';
import { Box } from '@mui/system';

type PropsType = {
    member: UserType 
}

const SingleMember = ({member}: PropsType) => {
  const { selectedChat } = useSelector(chatState)
  const { user } = useSelector(userState)
  const dispatch = useDispatch()
  if(!user || !member || !selectedChat) return <LinearProgress/>
  
  const permission = selectedChat?.groupAdmin?._id === user._id && member._id !== user._id
  
  const removeMemberFromGroupHandler = () => {
    if(!selectedChat || !member) return
    dispatch<any>(removeMemberFromGroup({userId:member._id, chatId:selectedChat._id}))
  }
  

  return (
    <>
        <ListItem sx={styles.list_item}>
          <ListItemIcon>
               <Avatar src={member.pic} /> 
          </ListItemIcon>
          <ListItemText sx={styles.list_item_text}  primary={selectedChat?.groupAdmin?._id === member._id? 
          <Box sx={styles.member_name_div}>
             {member.name}
            <Box sx={styles.admin_label}>ADMIN</Box>
          </Box> :
          member.name 
        }/>
        {permission &&
         <ListItemIcon>
              <IconButton onClick={removeMemberFromGroupHandler}>
                  <Cancel /> 
              </IconButton>
          </ListItemIcon>}
        </ListItem>
    </>
  )
}

export default SingleMember