import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './user'
import kycReducer from './kyc'
import alertsReducer from './alerts'

export const store = configureStore({
  reducer: {
    user: userReducer,
    kyc: kycReducer,
    alerts: alertsReducer,
  },
})
