import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { chatState } from '../../../../slice/chat/chatSlice'
import {  createNewMessage, messageState } from '../../../../slice/messages/messageSlice'
import { userState } from '../../../../slice/user/userSlice'
import { useChatScroll } from '../../../../ScrollHook'
import './Chat.css'
import ChatForm from './ChatForm'
import ChatHeader from './ChatHeader'
import Message from './Message';
import { socketState } from '../../../../slice/socketAPI/socketSlice'
import { LinearProgress } from '@mui/material'

const Chat = () => {

  // SELECT DATA FROM REDUX
  const {messages} = useSelector(messageState)
  const {user} = useSelector(userState)
  const { selectedChat } = useSelector(chatState)
  const { socket } = useSelector(socketState)
  const ref:any= useChatScroll(messages)
  const dispatch = useDispatch()
  const [content, setContent] = useState("")

// save input value for creating NEW MESSAGE
  const contentHandler = (e: React.ChangeEvent<HTMLInputElement> ) => {
    setContent(e.target.value)
  }


  useEffect(() => {
      if(!content || !socket || !selectedChat) return
      else {
        socket.removeAllListeners("typing")
        socket.emit("typing", selectedChat._id);
        setTimeout(() => {
          socket.removeAllListeners("stop typing")
          socket.emit("stop typing", selectedChat._id)
        }, 3000)
      }
  }, [content, selectedChat,socket ])

// send message to backend
  const onSendMessage = async() => {
    if(content && content.trim() && selectedChat &&selectedChat._id){
    dispatch<any>(createNewMessage({content, chatId:selectedChat._id}))
    setContent("")
    } 
  }


  useEffect(() => {
    setContent("")
  }, [selectedChat])


  if(!selectedChat) return <LinearProgress/>

  return (
    <>
   <section className="msger">
      
      <ChatHeader/>

  
      <main ref={ref} className="msger-chat">
        <>
            <Message messages={messages} user={user}/>
        </>
      </main>

      <ChatForm contentHandler={contentHandler} content={content} onSendMessage={onSendMessage} />

</section>
  </>
    )
}

export default Chat