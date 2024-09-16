import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  connected: false,
  user: {
    notifications: [],
  },
  isAdmin: false,
}

interface LoginAction {
  payload: {
    verified: boolean
    data: {}
    isAdmin: boolean
  }
}

interface UpdateAction {
  payload: {
    data: any
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state: any, action: LoginAction) => {
      state.connected = true
      state.user = action.payload.data
      state.isAdmin = action.payload.isAdmin
    },
    updateUser: (state: any, action: UpdateAction) => {
      state.user = action.payload.data
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, updateUser } = userSlice.actions

export default userSlice.reducer
