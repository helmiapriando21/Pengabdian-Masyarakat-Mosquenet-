import { configureStore } from "@reduxjs/toolkit";
import assetReducer from './assetSlice';
import contentReducer from './contentSlice';
import activityReducer from './activitySlice';
import incomeReducer from './incomeSlice';
import outcomeReducer from './outcomeSlice';
import accountBankReducer from './accountBankSlice';
import archiveReducer from './archiveSlice';
import configReducer from './configurationSlice';
import feedbackReducer from './feedbackSlice';
import mosqueReducer from './mosqueSlice';
import dashboardReducer from './dashboardSlice';
import jamaahReducer from './jamaahSlice';

export const store = configureStore({
  reducer: {
    'assets': assetReducer,
    'contents': contentReducer,
    'activities': activityReducer,
    'incomes': incomeReducer,
    'outcomes': outcomeReducer,
    'accountBank': accountBankReducer,
    'archive': archiveReducer,
    'config': configReducer,
    'feedback': feedbackReducer,
    'mosque': mosqueReducer,
    'dashboard': dashboardReducer,
    'jamaah': jamaahReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;