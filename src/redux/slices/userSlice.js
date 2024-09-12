import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

// Export actions for setting and clearing the OTP
export const { setUser, logout } = userSlice.actions;

// Export the reducer to include in the store
export default userSlice.reducer;
