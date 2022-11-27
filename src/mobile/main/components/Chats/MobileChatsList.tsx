import { Button, List, ListSubheader, Tab, Tabs, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { chatState, getChatsByToken, toggleAddGroupModel } from '../../../../slice/chat/chatSlice'
import { userState } from '../../../../slice/user/userSlice'
import SingleChatList from './SingleChatList'
import styles from './style'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { ChatType } from '../../../../types/chatType'



const MobileChatList = () => {

    // SELECT DATA FROM REDUX
    const {chats} = useSelector(chatState)
    const {token} = useSelector(userState)
    const [chatSearch, setChatSearch] = useState("")
    const [tabValue, setTabValue] = useState("all")

    const dispatch = useDispatch()
    const chatFilter = (chat: ChatType) => {
        if(chat.isGroupChat) {
        return chat.chatName.includes(chatSearch)
        }
        else {
        return chat.users.filter(u => u.name.includes(chatSearch))[0]
        }
    }
    
    const tabFilter = (e:React.SyntheticEvent<Element, Event>, value: "all"|"chat"|"group") => {
        setTabValue(value)  
    }

    const filterByType = (chat: ChatType) => {
        if(tabValue === 'group') return chat.isGroupChat
        else if(tabValue === 'chat') return !chat.isGroupChat
        else return chat
    }

    const openGroupPopup = () => {
        dispatch(toggleAddGroupModel())
    }

    useEffect(() => {
        dispatch<any>(getChatsByToken())
        // eslint-disable-next-line 
    }, [token])
    
    return (
    <List
    data-name="chats_list"
    sx={styles.chats_list}
    component="nav"
    aria-labelledby="nested-list-subheader"
    subheader={
        
        <ListSubheader component="div" id="nested-list-subheader">
             <Button onClick={openGroupPopup} color="primary" fullWidth startIcon={<GroupAddIcon/>} variant="text">CREATE GROUP</Button>
                <TextField data-name="chats_search" value={chatSearch} onChange={(e) => setChatSearch(e.target.value)} sx={styles.chats_search} fullWidth variant="standard"/>  
        <Box data-name="tabs_box" sx={styles.tabs_box}>
        <Tabs onChange={tabFilter} value={tabValue}>
            <Tab value="all" label="All"/>
            <Tab  value="chat" label="Chats"/>
            <Tab  value="group" label="Groups"/>
        </Tabs>
        </Box>
        </ListSubheader>
    }
    >  
    {chats?.filter(filterByType).filter(chatFilter).map((chat) =>  {
            // eslint-disable-next-line 
            return  <SingleChatList chat={chat} key={chat._id} setChatSearch={setChatSearch} />
    })}
    </List>
);
}

export default MobileChatList