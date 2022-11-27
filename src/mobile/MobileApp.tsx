import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { clearError, userState, userValidation } from '../slice/user/userSlice'
import MobileLogin from '../mobile/login/MobileLogin'
import MobileRegister from '../mobile/register/MobileRegister'
import MobileMain from '../mobile/main/MobileMain'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MobileApp = () => {
  const { token , user, error } = useSelector(userState)
  const dispatch = useDispatch()


  const setToast = (error:string) => {
    toast.error(error, {
        position: toast.POSITION.TOP_CENTER
    })
    dispatch(clearError())
  }

  useEffect(() => {
    if(token && !user) {
      dispatch<any>(userValidation(token))
    }
    // eslint-disable-next-line 
  }, [token])

  useEffect(() => {
    if(!error) return
    else setToast(error)
    // eslint-disable-next-line 
}, [error])


  return (
    <React.Fragment>
      <ToastContainer/>
     <BrowserRouter>
        <Routes>
          <Route path="/login" element={<MobileLogin />}/>
          <Route path="/register" element={<MobileRegister />}/>
          <Route path="/" element={<MobileMain />}/>
        </Routes>
    </BrowserRouter>     
    </React.Fragment>
  )
}

export default MobileApp