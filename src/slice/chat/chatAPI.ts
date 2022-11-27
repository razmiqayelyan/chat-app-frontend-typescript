import axios from "axios"
import { UserType } from "../../types/userType"
import { DOMAIN } from "../user/userAPI"


export type NewGroupDataType = {
    users : Array<UserType> | null
    name : string | null
}

export type GroupMemberAddRemoveType = {
    userId: string
    chatId: string
}
export type GroupNameEditType = {
    chatId: string
    chatName: string
}


const getChats = async(token: string) => {
    return await axios.get(DOMAIN + 'api/chat', {
        headers: {
            'Authorization': `Bearer ${token}` 
          }
    })
}


const newGroupChat = async(data: NewGroupDataType, token: string) => {
    const {users, name} = data
    return await axios.post(DOMAIN + "api/chat/group", {
        users: JSON.stringify(users),
        name
    },
    {
    headers: {
        'Authorization': `Bearer ${token}` 
    }
    })
}

const groupMemberRemove = async(data: GroupMemberAddRemoveType, token: string) => {
    const {userId, chatId} = data
    return await axios.put(DOMAIN + "api/chat/groupremove", {
        chatId,
        userId
    },
    {
    headers: {
        'Authorization': `Bearer ${token}` 
    }
    })
}

const groupMemberAdd = async(data: GroupMemberAddRemoveType, token: string) => {
    const {userId, chatId} = data
    return await axios.put(DOMAIN + "api/chat/groupadd", {
        chatId,
        userId
    },
    {
    headers: {
        'Authorization': `Bearer ${token}` 
    }
    })
}

const groupNameEdit = async(data: GroupNameEditType, token: string) => {
    const {chatId , chatName} = data
    return await axios.put(DOMAIN + "api/chat/rename", {
        chatId,
        chatName
    },
    {
    headers: {
        'Authorization': `Bearer ${token}` 
    }
    })
}


const accessChat = async(user: UserType, token: string) => {
    return await axios.post(DOMAIN + "api/chat", {
        userId: user._id
    },
    {
        headers: {
            'Authorization': `Bearer ${token}` 
        }
    }
    )
}

const functions = {
    getChats,
    newGroupChat,
    accessChat,
    groupMemberRemove,
    groupMemberAdd,
    groupNameEdit
}
export default functions