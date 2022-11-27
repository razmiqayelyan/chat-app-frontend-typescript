import React from 'react'
import { useState , useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { userRegister, userState } from '../../../slice/user/userSlice';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './style';




const LoginPage = () => {
    const {token} = useSelector(userState)
    const dispatch = useDispatch()
    const [user, setUser] = useState({email:"", password:"", name:"", confirmPassword:""})
    let navigate = useNavigate();

    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUser(user => ({...user, [e.target.name]:e.target.value}))
    }

    const onSubmit = (e:  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(user.password !== user.confirmPassword) return toast.error('Password and Confirm Passwords are not match!', {
          position: toast.POSITION.TOP_CENTER
      });
      else{
        dispatch<any>(userRegister(user))
        setUser({email:"", password:"", name:"", confirmPassword:""})
      }
    }
    
    useEffect(() => {
      if(token) navigate("/")
    }, [token, navigate])

    const disabled = user.password.length < 1 || user.password !== user.confirmPassword
    
  return (
    <>
        <ToastContainer/>
    <Box sx={styles.main_register_box}>
    <Paper sx={styles.register_paper}>
      <form onSubmit={onSubmit} >
        <Box sx={styles.register_form}>
      <Box>      
        <Typography sx={styles.create_account} variant='h4'>Create Account</Typography>
      </Box>
          <TextField value={user.name} required style={styles.register_input} fullWidth label="Name"  name='name' onChange={handleChange} type="text" />
          <TextField value={user.email} required style={styles.register_input} fullWidth  label="Email"  name='email' onChange={handleChange} type="email" />
          <TextField value={user.password} required style={styles.register_input} fullWidth  label="Password" name="password" onChange={handleChange}  type="password" />
          <TextField value={user.confirmPassword} required style={styles.register_input} fullWidth  label="Confirm Password" name="confirmPassword" onChange={handleChange}  type="password" />
          <Link to={'/login'} style={styles.to_login_link}>Already have account?</Link>
          <Button disabled={disabled} type='submit' >Register</Button>
          </Box>
      </form>
    </Paper>
    </Box>
    </>
  )
}

export default LoginPage