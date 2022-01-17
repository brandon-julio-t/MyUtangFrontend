import { configureStore, createSlice } from '@reduxjs/toolkit';
import Debt from '../models/Debt';

export const indexSlice = createSlice({
  name: 'index',

  initialState: {
    debts: [] as Debt[],
    lendings: [] as Debt[],
  },

  reducers: {
    loadDebts: (state, action: { type: string; payload: Debt[] }) => {
      state.debts = action.payload;
    },
    removeDebt: (state, action: { type: string; payload: Debt }) => {
      state.debts = state.debts.filter(debt => debt.id !== action.payload.id);
    },
    loadLendings: (state, action: { type: string; payload: Debt[] }) => {
      state.lendings = action.payload;
    },
    addLending: (state, action: { type: string; payload: Debt }) => {
      state.lendings = [...state.lendings, action.payload];
    },
  },
});

export const indexStore = configureStore({
  reducer: indexSlice.reducer,
});

export const { loadDebts, removeDebt, loadLendings, addLending } = indexSlice.actions;

export type IndexRootState = ReturnType<typeof indexStore.getState>;
export type IndexDispatch = typeof indexStore.dispatch;
