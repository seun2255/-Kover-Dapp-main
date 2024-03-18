import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  kycApplicants: [],
  kycReviewerApplicants: [],
}

interface KYCAction {
  payload: {
    data: any[]
  }
}

export const kycSlice = createSlice({
  name: 'kyc',
  initialState,
  reducers: {
    setKYCApplicants: (state: any, action: KYCAction) => {
      state.kycApplicants = action.payload.data
    },
    setKYCReviewerApplicants: (state: any, action: KYCAction) => {
      state.kycReviewerApplicants = action.payload.data
    },
  },
})

// Action creators are generated for each case reducer function
export const { setKYCApplicants, setKYCReviewerApplicants } = kycSlice.actions

export default kycSlice.reducer
