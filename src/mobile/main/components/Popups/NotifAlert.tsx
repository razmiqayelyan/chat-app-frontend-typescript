import { Alert, Avatar } from '@mui/material'
import React from 'react'

type PropsType = {
    alert: {
        pic: string
        sender: string
        message: string
    }
}

const NotifAlert = ({alert}:PropsType) => {
  return (
    <>
        <Alert icon={<Avatar src={alert.pic}/>}  security='success' >
         <p style={{fontSize:"12px", fontWeight:"bold", textTransform:"capitalize" }}>{alert.sender}</p> {alert.message}
     </Alert>
    </>
  )
}

export default NotifAlert