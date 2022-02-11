import { createSlice } from '@reduxjs/toolkit';
import Debt from '../models/Debt';

const { reducer, actions } = createSlice({
  name: 'index',

  initialState: {
    debts: [] as Debt[],
    lendings: [] as Debt[],
    debtHistory: [] as Debt[],
    lendingHistory: [] as Debt[],
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
    updateLending: (state, action: { type: string; payload: Debt }) => {
      state.lendings = state.lendings.map(debt =>
        debt.id === action.payload.id ? action.payload : debt
      );
    },

    loadDebtHistory: (state, action: { type: string; payload: Debt[] }) => {
      state.debtHistory = action.payload;
    },
    addDebtHistory: (state, action: { type: string; payload: Debt }) => {
      state.debtHistory = [...state.debtHistory, action.payload];
    },

    loadLendingHistory: (state, action: { type: string; payload: Debt[] }) => {
      state.lendingHistory = action.payload;
    },
  },
});

export const indexReducer = reducer;
export const {
  loadDebts,
  removeDebt,
  loadLendings,
  addLending,
  updateLending,
  loadDebtHistory,
  addDebtHistory,
  loadLendingHistory,
} = actions;
