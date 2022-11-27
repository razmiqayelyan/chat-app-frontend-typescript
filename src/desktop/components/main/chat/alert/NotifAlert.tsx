import { Alert, Avatar, Typography } from '@mui/material';
import React from 'react';
import styles from './style';

type PropsType = {
  alert: {
    pic: string
    sender: string
    message : string
  }
}

const NotifAlert = ({alert}:PropsType) => {
  return (
    <>
        <Alert icon={<Avatar src={alert.pic}/>}  sx={styles.alert} security='success' >
         <Typography component='p' sx={styles.alert_p}>{alert.sender}</Typography> {alert.message}
      </Alert>
    </>
  )
}

export default NotifAlert