import { ChatType } from "./chatType"
import { UserType } from "./userType"

export type messageType = {
    _id: string
    sender:UserType 
    content: string
    chat: ChatType
    createdAt?:string
}

