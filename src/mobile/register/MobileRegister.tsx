import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {  userRegister, userState } from '../../slice/user/userSlice'
import styles from './style'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MobileRegister = () => {

  const {token} = useSelector(userState)
  const [userInfo, setUserInfo] = useState({email:"", password:"", name:"", confirmPassword:""})

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const disabled = (!userInfo.email || !userInfo.name || !userInfo.password || !userInfo.confirmPassword) || userInfo.password !== userInfo.confirmPassword
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserInfo(user => ({...user, [e.target.name]:e.target.value}))
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if(userInfo.password !== userInfo.confirmPassword) return toast.error('Password and Confirm Passwords are not match!', {
        position: toast.POSITION.TOP_CENTER
    });
      else {dispatch<any>(userRegister(userInfo))
      setUserInfo({email:"", password:"", name:"", confirmPassword:""})
      }
  }

  
  useEffect(() => {
    if(token) navigate("/")
  }, [token, navigate])



  return (
    <>
     <ToastContainer/>
     <Box data-name="main_box" sx={styles.main_box}>
    <Paper data-name="register_papper" sx={styles.register_papper}>
      <form onSubmit={onSubmit}>
        <Box sx={styles.mobile_register_form}>
            <Typography data-name="register_title" sx={styles.register_title}>Create Account</Typography>
            <TextField value={userInfo.name} onChange={handleChange} name="name" aria-required required type="text" label="Name" />
            <TextField value={userInfo.email}  onChange={handleChange} name="email" aria-required required type="email" label="Email" />
            <TextField value={userInfo.password}  onChange={handleChange} name="password" aria-required required type="password" label="Password" />
            <TextField value={userInfo.confirmPassword}  onChange={handleChange} name="confirmPassword" aria-required required type="password" label="Confirm Password" />
            <Link data-name="login_link" style={styles.login_link} to="/login">Already have account?</Link>
            <Button type='submit' variant="contained" disabled={disabled} >Register</Button>
        </Box>
      </form>
    </Paper>
  </Box>
    </>

  )
}

export default MobileRegister