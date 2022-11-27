import axios from "axios"
import { DOMAIN } from "../user/userAPI"



const createMessage = async(content:string, chatId: string, token: string) => {
    return await axios.post(DOMAIN + 'api/message', {
        content,
        chatId
    },
    {
        headers: {
            "Content-Type":"application/json",
            'x-csrf-token': `${token}` 
          }
    }
    )
}

const getMessages = async(chatId: string, token: string) => {
    return await axios.get(DOMAIN + `api/message/${chatId}`, {
        headers: {
            "Content-Type":"application/json",
            'x-csrf-token': `${token}` 
          }
    })
}

const functions = {
    getMessages,
    createMessage
}

export default functions