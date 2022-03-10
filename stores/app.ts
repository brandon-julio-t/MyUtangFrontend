import User from '../models/User';
import { indexReducer } from './index-slice';
import { configureStore, createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',

  initialState: {
    user: null as User | null,
  },

  reducers: {
    setUser: (state, action: { type: string; payload: User | null }) => {
      state.user = action.payload;
    },
    setUsername: (state, action: { type: string; payload: string }) => {
      const clone = state.user?.clone() ?? null;
      if (clone) clone.userName = action.payload;
      state.user = clone;
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
