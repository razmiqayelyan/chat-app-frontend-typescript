import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { OneToOneChat, setSelectedChat, toggleAddGroupModel } from '../../../../slice/chat/chatSlice'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Autocomplete, Avatar, IconButton, TextField, Toolbar } from '@mui/material'
import { getUsers, setWithUser, toggleUserModal, userInitial, userState } from '../../../../slice/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import styles from './style'
import { UserType } from '../../../../types/userType';

const Navbar = () => {
  const dispatch = useDispatch()
  const { user , allUsers, withUser} = useSelector(userState)
  const [searchUser, setSearchUser] = useState(null as UserType | null) 
  const [logout, setLogout] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    if(allUsers) return
    else dispatch<any>(getUsers())
     // eslint-disable-next-line 
  }, [allUsers])

  useEffect(() => {
    if(withUser) {
      dispatch<any>(OneToOneChat(withUser))
    }
     // eslint-disable-next-line 
  }, [withUser])



  useEffect(() => {
    if(!searchUser) return
    else {
      dispatch<any>(setWithUser(searchUser))
      setSearchUser(null)
    }
     // eslint-disable-next-line 
  }, [searchUser])

  const openModal = () => {
    dispatch<any>(toggleUserModal())
  }


  const handleOpen = () => {
    dispatch<any>(toggleAddGroupModel())
  }

  useEffect(() => {
    if(logout){
      setLogout(false)
      navigate("/login")
      // @ts-ignore
      window.location = "/" 
    }
  }, [logout, navigate])
  const signOut = () => {
    localStorage.removeItem("token")
    dispatch<any>(userInitial())
    setLogout(true)
  }

  const ToChatApp = () => {
    dispatch<any>(setSelectedChat(null))
  }
  return (
    <AppBar position='sticky'>
    <Toolbar   sx={styles.toolbar}>
        <div style={styles.chat_app_div}>
        <Link onClick={ToChatApp} style={styles.chat_app_link} to="/" >Chat App</Link>
        <Box  onClick={handleOpen} sx={styles.group_add_icon_div}>
          <GroupAddIcon />
              <span>Group</span>    
        </Box>    
        </div>

        <Autocomplete
                      value={searchUser}
                      sx={styles.autocomplate_sx}
                      id="checkboxes-tags-demo"
                      options={allUsers ? allUsers : []}
                      getOptionLabel={(user) => user.email}
                      onChange={(event, newValue : UserType | null) => {
                        setSearchUser(newValue)
                      }}
                      renderOption={(props, user, { selected }) =>   (
                          <li {...props}>
                            <Box sx={styles.li_main_box}>
                            <Box sx={styles.email_span_box}><Avatar sx={styles.avatar} src={user?.pic}/> <span>{user?.email}</span></Box>
                            <ChatBubbleOutlineOutlinedIcon color='primary'  />
                            </Box>
                          </li>
                      )}
                      style={styles.autocomplate_style}
                      renderInput={(params) => (
                        <TextField {...params}  placeholder="Search User..." />
                      )}
                    />
   
        <div style={styles.user_info_div}>
          <IconButton onClick={openModal}>
            <Avatar alt={user?.name} src={user?.pic}/>
          </IconButton >
          
          <IconButton onClick={signOut} sx={styles.logout_icon}>
            <LogoutIcon/>
          </IconButton>
        </div>
    </Toolbar>
    </AppBar>
  )
}

export default Navbar