import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './user'
import kycReducer from './kyc'

export const store = configureStore({
  reducer: {
    user: userReducer,
    kyc: kycReducer,
  },
})
