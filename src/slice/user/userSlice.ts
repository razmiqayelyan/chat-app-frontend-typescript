import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { editUserType, loginUserType, registerUserType, UserType } from '../../types/userType'
import userAPI from './userAPI'



export const userLogin = createAsyncThunk(
    'user/login',
    async (user: loginUserType, thunkAPI) => {
      try {
        const response = await userAPI.login(user)
        return response?.data
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data.message)
      }
    }
  )

export const userRegister = createAsyncThunk(
    'user/register',
    async (user: registerUserType, thunkAPI) => {
      try {
        const response = await userAPI.register(user)
        return response?.data
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data.message)
      }
    }
  )


export const profileEdit = createAsyncThunk(
    'user/profileEdit',
    async (data: editUserType, thunkAPI: any) => {
    try {
        let {token} = thunkAPI.getState().user
        if((!data.name && !data.pic) || !token) return
        const response = await userAPI.editUser(data, token)
        return response.data
    } catch (error:any) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
    }
  )

export const userValidation = createAsyncThunk(
    'user/validate',
    async (token: string, thunkAPI) => {
      try {
        const response = await userAPI.validateToken(token)
        return response.data 
      } catch (error) {
        return thunkAPI.rejectWithValue("Session Expired")
      }
    }
  )

export const getUsers = createAsyncThunk(
    'get/users',
    async (query, thunkAPI:any) => {
      let {token} = thunkAPI.getState().user
      if(!token) return
      const response = await userAPI.allUsers(token)
      return response.data
    }
  )




// @ts-ignore
let token  = JSON.parse(localStorage.getItem("token")) || null

const initialState = {
    user: null as UserType | null,
    loading:false,
    error:null as string | null,
    token: token as string | null,
    allUsers:null as Array<UserType> | null,
    withUser:null as UserType | null,
    userModal:false,
    leftDrawer:false
}


// TYPES FOR USER_SLICE
type initialUserStateType = typeof initialState


export const userState = (state: RootState) => state.user


type ActionUserType = {
    payload:  UserType
}


type ActionAllUsers = { payload: Array<UserType> | null}

const userSlice = createSlice({
    name:"user/all",
    initialState,
    reducers:{
      userInitial:(state) => {
        state = initialState
      },
      setWithUser: (state, action) => {
        state.withUser = action.payload
      },
      toggleUserModal:(state) => {
        state.userModal = !state.userModal
      } ,
      unsetWithUser: (state) => {
        state.withUser = null
      },
      clearError: (state) => {
        state.error = null
      },
      toggleLeftDrawer: (state:initialUserStateType, action) => {
        if(action.payload === 'close') state.leftDrawer = false
        else state.leftDrawer = !state.leftDrawer
      }

    },
    extraReducers:(builder) => {
        builder
            .addCase(userLogin.fulfilled, (state, action) => {
                state.user = action.payload
                state.token = action.payload?.token
                state.error = null
                localStorage.setItem("token", JSON.stringify(action.payload.token))

            })
            .addCase(userLogin.rejected, (state, action: any) => {
                state.user = null
                state.token = null
                state.error = action.payload
            })
            .addCase(userValidation.fulfilled, (state, action : ActionUserType) => {
                state.user = action.payload
                state.error = null
            })
            .addCase(userValidation.rejected, (state, action: any) => {
                state.user = null
                state.token = null
                state.error = action.payload
                localStorage.removeItem("token")
            })
            .addCase(getUsers.fulfilled, (state, action : ActionAllUsers) => {
              state.allUsers = action.payload
            })
            .addCase(userRegister.fulfilled, (state, action) => {
              state.user = action.payload
              state.token = action.payload?.token
              state.error = null
              localStorage.setItem("token", JSON.stringify(action.payload.token))

          })
          .addCase(userRegister.rejected, (state, action: any) => {
              state.user = null
              state.token = null
              state.error = action.payload
          })
          .addCase(profileEdit.fulfilled, (state, action)=> {
            if(!action.payload) return
            state.user = action.payload
            state.error = null
          })
          .addCase(profileEdit.rejected, (state, action: any) => {
            state.error = action.payload
          })
    }
})

export const { userInitial, setWithUser, unsetWithUser, toggleUserModal, toggleLeftDrawer, clearError } = userSlice.actions

export default userSlice.reducer