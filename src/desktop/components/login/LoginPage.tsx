import React, { FormEvent } from 'react';
import { useState , useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, userState } from '../../../slice/user/userSlice';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import styles from './style'

const LoginPage = () => {
    const {token} = useSelector(userState)
    const dispatch = useDispatch()
    const [user, setUser] = useState({email:"", password:""})
    let navigate = useNavigate();


    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUser(user => ({...user, [e.target.name]:e.target.value}))
    }

    const onSubmit = (e:FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      dispatch<any>(userLogin(user))
      setUser({email:"", password:""})
    }
    
    useEffect(() => {
      if(token) navigate("/")
    }, [token, navigate])

    
  return (
    <>
      <Box sx={styles.main_box}>
    <Paper sx={styles.login_paper}>
      <form onSubmit={onSubmit}>
        <Box sx={styles.login_form}>
          <Box>      
            <Typography sx={styles.login_font} variant='h4'>Login</Typography>
          </Box>
          <TextField value={user.email} required aria-required label="Email"  name='email' onChange={handleChange} type="email" />
          <TextField value={user.password} required aria-required label="Password" name="password" onChange={handleChange}  type="password" />
          <Link to={'/register'} style={styles.to_register_link}>Dont have account?</Link>
          <Button disabled={user.password.length < 1} type='submit' >Login</Button>
          </Box>
      </form>
    </Paper>
    </Box>
    </>
  )
}

export default LoginPage