import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { messageType } from '../../types/messageType'
import messageAPI from './messageAPI'


const initialState = {
    messages:undefined as Array<messageType> | undefined,
    lastCreatedMessage:undefined as messageType | undefined,
    emitTime:false,
    typing:false,
}

export type initialChatStateType = typeof initialState

export const messageState = (state: RootState) => state.message


// get all messages in first render
export const getAllMessages = createAsyncThunk(
    'messages/getAll',
    async (chatID: string, thunkAPI: any) => {
    const {token} = thunkAPI.getState().user
    if(!chatID || !token) return localStorage.removeItem("token")
    const response = await messageAPI.getMessages(chatID, token)
    return response.data
    }
  )


// create new message
export const createNewMessage = createAsyncThunk(
    'messages/create',
    async ({content, chatId}:{content:string,chatId:string}, thunkAPI:any) => {
    const {token} = thunkAPI.getState().user
    if(!chatId || !token || !content) return
    const response = await messageAPI.createMessage(content, chatId, token)
    return response.data
    }
  )




const messageSlice = createSlice({
    name:"getMessages",
    initialState,
    reducers:{
        clearMessages: (state) => {
            state.messages = undefined
        },
        addMessage: (state, action) => {
            if(!state.messages) return
            state.messages.push(action.payload)
        },
        offEmiting: (state) => {
            state.emitTime = false
        },
        startTyping:(state) => {
            state.typing = true
        },
        finishTyping:(state) => {
            state.typing = false
        },
        messageInitial: (state) => {
            state = initialState
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(getAllMessages.fulfilled, (state, action) => {
                state.messages = action.payload
            })

            // create Message
            .addCase(createNewMessage.fulfilled, (state, action:{payload:messageType}) => {
                state.lastCreatedMessage = action.payload
                if(!state.messages) state.messages = [ action.payload]
                else state.messages = [...state.messages, action.payload]
                state.emitTime = true
            })
    }
})

export const { addMessage, offEmiting, messageInitial, startTyping, finishTyping ,clearMessages} = messageSlice.actions

export default messageSlice.reducer