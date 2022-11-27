import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userLogin, userState } from '../../slice/user/userSlice'
import styles from './style'


const MobileLogin = () => {
  const {token} = useSelector(userState)
    const dispatch = useDispatch()
    const [userInfo, setUserInfo] = useState({email:"", password:""})
    let navigate = useNavigate();
    const disabled = !userInfo.email || !userInfo.password

    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setUserInfo(user => ({...user, [e.target.name]:e.target.value}))
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch<any>(userLogin(userInfo))
        setUserInfo({email:"", password:""})
    }
    
    useEffect(() => {
      if(token) navigate("/")
    }, [token, navigate])

  return (<>
       <Box data-name="main_box" sx={styles.main_box}>
      <Paper data-name="login_papper" sx={styles.login_papper}>
        <form onSubmit={onSubmit}>
         <Box  sx={styles.mobile_login_form}>
            <Typography data-name="login_title" sx={styles.login_title}>Login</Typography>
            <TextField value={userInfo.email} onChange={handleChange} name="email" aria-required required type="email" label="Email" />
            <TextField value={userInfo.password} onChange={handleChange} name="password" aria-required required type="password" label="Password" />
            <Link data-name="register_link" style={styles.register_link} to="/register">Dont have account?</Link>
            <Button type='submit' variant="contained"  disabled={disabled}>Login</Button>   
          </Box>
        </form>
      </Paper>
    </Box>
  
  </>
 
  )
}

export default MobileLogin