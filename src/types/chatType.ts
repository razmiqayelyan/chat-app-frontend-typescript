import { messageType } from "./messageType"
import { UserType } from "./userType"

export type ChatType = {
    _id: string
    chatName: string
    isGroupChat: boolean
    users: Array<UserType>
    lastMessage?: messageType,
    groupAdmin?:UserType
}