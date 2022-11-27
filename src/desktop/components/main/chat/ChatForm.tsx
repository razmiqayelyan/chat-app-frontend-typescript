import React from 'react'

type PropsType = {
  contentHandler: (e: React.ChangeEvent<HTMLInputElement> ) => void,
  content : string,
  onSendMessage: () => void
}
const ChatForm = ({contentHandler, content, onSendMessage}: PropsType) => {
  return (
    <>
         <form onSubmit={(e) => e.preventDefault()} className="msger-inputarea">
            <input value={content} onChange={contentHandler} type="text" className="msger-input" placeholder="Enter your message..."/>
            <button onClick={onSendMessage} type='submit' className="msger-send-btn">Send</button>
        </form>
    </>
  )
}

export default ChatForm