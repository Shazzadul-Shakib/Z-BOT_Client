import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  otp: null,
};

const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {
    setOtp(state, action) {
      state.otp = action.payload.otp;
    }
  },
});

// Export actions for setting and clearing the OTP
export const { setOtp } = otpSlice.actions;

// Export the reducer to include in the store
export default otpSlice.reducer;
