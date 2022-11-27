import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import chatSlice from '../slice/chat/chatSlice';
import messageSlice from '../slice/messages/messageSlice';
import notificationSlice from '../slice/notification/notificationSlice';
import socketSlice from '../slice/socketAPI/socketSlice';
import userSlice from '../slice/user/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    chat:chatSlice,
    message: messageSlice,
    socket:socketSlice,
    notification:notificationSlice
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
