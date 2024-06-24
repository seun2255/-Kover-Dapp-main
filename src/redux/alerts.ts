import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  displayAlert: false,
  alertData: {
    id: 1,
    variant: 'Successful',
    classname: 'text-black',
    title: 'Submission Successful',
    tag1: 'KYC application submitted',
    tag2: 'View on etherscan',
  },
}

interface Alert {
  payload: {
    displayAlert: boolean
    data: {
      id: number
      variant: string
      classname: string
      title: string
      tag1: string
      tag2: string
      hash?: string
    }
  }
}

export const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    openAlert: (state: any, action: Alert) => {
      state.displayAlert = true
      state.alertData = action.payload.data
    },
    closeAlert: (state: any) => {
      state.displayAlert = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { openAlert, closeAlert } = alertsSlice.actions

export default alertsSlice.reducer
