import { AppBar, Avatar, IconButton, LinearProgress, Toolbar } from '@mui/material'
import React, { useState , useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUsers, setWithUser, toggleLeftDrawer, toggleUserModal, userInitial, userState } from '../../../../slice/user/userSlice'
import styles from './style'
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/MenuOpen';
import { Box } from '@mui/system'



const MobileNavbar = () => {
  const dispatch = useDispatch()
  const { user , allUsers} = useSelector(userState)
  const [searchUser, setSearchUser] = useState(null) 
  const [logout, setLogout] = useState(false)
  const navigate = useNavigate();


  useEffect(() => {
    if(allUsers) return
    else dispatch<any>(getUsers())
    // eslint-disable-next-line 
  }, [allUsers])




  useEffect(() => {
    if(!searchUser) return
    else {
      dispatch(setWithUser(searchUser))
      setSearchUser(null)
    }
    // eslint-disable-next-line 
  }, [searchUser])

  
  const openModal = () => {
    dispatch(toggleUserModal())
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
    dispatch(userInitial())
    setLogout(true)
  }

  const reloadPage = () => {
    window.location.reload()
  }
  const openDrawer = () => {
    dispatch<any>(toggleLeftDrawer(null))
  }
  if(!user) return <LinearProgress/>
  return (
    <AppBar position='sticky'>
        <Toolbar data-name="toolbar" sx={styles.toolbar}>
          <Box>
          <IconButton onClick={openDrawer}  data-name="menu_icon" sx={styles.menu_icon} >
              <MenuIcon/>
            </IconButton>
            <IconButton onClick={reloadPage}  data-name="menu_icon" sx={styles.menu_icon} >
              <HomeIcon/>
            </IconButton>
          </Box>
            
            <Box>
              <IconButton onClick={openModal}>
                  <Avatar src={user.pic} />
              </IconButton>

              <IconButton onClick={signOut} sx={{color:"white"}}>
                  <LogoutIcon/>
               </IconButton>
            </Box>
            
        </Toolbar>
    </AppBar>
  )
}

export default MobileNavbar