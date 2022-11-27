import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { ChatType } from '../../types/chatType'
import { UserType } from '../../types/userType'
import chatAPI, { GroupMemberAddRemoveType, GroupNameEditType, NewGroupDataType } from './chatAPI'

const initialState = {
    chats:undefined as Array<ChatType> | undefined,
    error:undefined as string | undefined,
    selectedChat:undefined as ChatType | undefined ,
    createGroupPopup:false,
    searchedChat:undefined as ChatType | undefined,
    groupMembersPopup:false
}

export type initialChatStateType = typeof initialState

export const chatState = (state: RootState) => state.chat

export const getChatsByToken = createAsyncThunk(
    'chats',
    async (thunkAPI) => {
    // @ts-ignore
    const token = JSON.parse(localStorage.getItem("token"))
    const response = await chatAPI.getChats(token)
    return response.data
    }
  )


export const createGroupChat = createAsyncThunk(
    'chats/createGroupChat',
    async (data:NewGroupDataType ,thunkAPI: any) => {
    const {token} = thunkAPI.getState().user
    if(!data.users || !data.name || !token) return
    const response = await chatAPI.newGroupChat(data, token)
    return response.data
    }
  )

export const removeFromGroup = createAsyncThunk(
    'chats/removeFromGroup',
    async (data: GroupMemberAddRemoveType ,thunkAPI: any) => {
    const {token} = thunkAPI.getState().user
    if(!data.userId || !data.chatId || !token) return
    const response = await chatAPI.groupMemberRemove(data, token)
    return response.data
    }
)

export const removeMemberFromGroup = createAsyncThunk(
    'chats/removeMemberFromGroup',
    async (data: GroupMemberAddRemoveType ,thunkAPI: any) => {
    const {token} = thunkAPI.getState().user
    if(!data.userId || !data.chatId || !token) return
    const response = await chatAPI.groupMemberRemove(data, token)
    return response.data
    }
)

export const addMemberToGroup = createAsyncThunk(
    'chats/addMemberToGroup',
    async (data : GroupMemberAddRemoveType,thunkAPI: any) => {
    const {token} = thunkAPI.getState().user
    if(!data.userId || !data.chatId || !token) return
    const response = await chatAPI.groupMemberAdd(data, token)
    return response.data
    }
)


export const editGroupName = createAsyncThunk(
    'chats/editGroupName',
    async (data: GroupNameEditType ,thunkAPI: any) => {
    const {token} = thunkAPI.getState().user
    if(!data.chatId || !data.chatName || !token) return
    const response = await chatAPI.groupNameEdit(data, token)
    return response.data
    }
)

export const OneToOneChat = createAsyncThunk(
    'chats/OneToOneChat',
    async (user: UserType ,thunkAPI: any) => {
    const {token} = thunkAPI.getState().user
    if(!user || !token) return
    const response = await chatAPI.accessChat(user, token)
    return response.data
    }
  )

const chatSlice = createSlice({
    name:"chat/get",
    initialState,
    reducers:{
        setSelectedChat: (state, action) => {
            state.selectedChat = action.payload?.chat || null
        },
        toggleAddGroupModel: (state) => {
            state.createGroupPopup = !state.createGroupPopup
        },
        removeSearchedChat: (state) => {
            state.searchedChat = undefined
        },
        chatInitial: (state) => {
            state = initialState
        },
        toggleGroupMembersPopup: (state) => {
            state.groupMembersPopup = !state.groupMembersPopup
        },
        unshiftChats: (state, action) => {
            state.chats?.unshift(action.payload)
        }

    },
    extraReducers:(builder) => {
        builder
        .addCase(getChatsByToken.fulfilled, (state, action) => {
            state.chats = action.payload
        })
        .addCase(createGroupChat.fulfilled, (state, action) => {
            if(!action.payload) return
            state.chats?.unshift(action.payload)
        })
        .addCase(OneToOneChat.fulfilled, (state, action) => {
            if(!action.payload) return
            if(state.chats && state.chats.filter((ch) => ch._id === action.payload._id).length > 0){
                state.selectedChat = action.payload
            }
            else {
                state.chats?.unshift(action.payload)
                state.selectedChat = action.payload
            }

        })
        .addCase(removeFromGroup.fulfilled, (state: initialChatStateType, action) => {
            if(!action.payload) return
            state.chats = state.chats?.filter(chat => chat._id !== action.payload._id)
            state.selectedChat = undefined
        })
        .addCase(removeMemberFromGroup.fulfilled, (state, action) => {
            if(!action.payload) return
            state.chats = state.chats?.map(chat => {
                if(chat._id === action.payload._id) return action.payload
                else return chat
            })
            state.selectedChat = action.payload
        })
        .addCase(addMemberToGroup.fulfilled, (state, action) => {
            if(!action.payload) return
            state.chats = state.chats?.map(chat => {
                if(chat._id === action.payload._id) return action.payload
                else return chat
            })
            state.selectedChat = action.payload
        })
        .addCase(editGroupName.fulfilled, (state, action) => {
            if(!action.payload) return
            state.chats = state.chats?.map(chat => {
                if(chat._id === action.payload._id) return action.payload
                else return chat
            })
            state.selectedChat = action.payload
        })
    }
})

export const {setSelectedChat, toggleAddGroupModel, chatInitial, removeSearchedChat, toggleGroupMembersPopup, unshiftChats} = chatSlice.actions

export default chatSlice.reducer