import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  kycModal: false,
}

interface Display {
  payload: {
    display: boolean
  }
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    displayKycModal: (state: any, action: Display) => {
      state.kycModal = action.payload.display
    },
  },
})

// Action creators are generated for each case reducer function
export const { displayKycModal } = appSlice.actions

export default appSlice.reducer
