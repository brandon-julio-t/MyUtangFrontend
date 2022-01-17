import { configureStore, createSlice } from '@reduxjs/toolkit';
import { indexReducer } from './index-slice';
import User from '../models/User';

export const appSlice = createSlice({
  name: 'app',

  initialState: {
    user: null as User | null,
  },

  reducers: {
    setUser: (state, action: { type: string; payload: User | null }) => {
      state.user = action.payload;
    },
  },
});

export const appStore = configureStore({
  reducer: {
    app: appSlice.reducer,
    index: indexReducer,
  },
});

export const { setUser } = appSlice.actions;
export type AppRootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
