import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  connected: false,
  user: {},
}

interface LoginAction {
  payload: {
    verified: boolean
    data: {
      address: string | null | undefined
    }
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state: any, action: LoginAction) => {
      state.connected = true
      state.user = action.payload.data
    },
    updateUser: (state: any, action: any) => {
      state.user = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, updateUser } = userSlice.actions

export default userSlice.reducer
