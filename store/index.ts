import { configureStore } from "@reduxjs/toolkit";
import assetReducer from './assetSlice';
import contentReducer from './contentSlice';
import activityReducer from './activitySlice';
import incomeReducer from './incomeSlice';
import outcomeReducer from './outcomeSlice';
import accountBankReducer from './accountBankSlice';
import archiveReducer from './archiveSlice';

export const store = configureStore({
  reducer: {
    'assets': assetReducer,
    'contents': contentReducer,
    'activities': activityReducer,
    'incomes': incomeReducer,
    'outcomes': outcomeReducer,
    'accountBank': accountBankReducer,
    'archive': archiveReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;