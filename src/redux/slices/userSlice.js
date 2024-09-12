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
  },
});

// Export actions for setting and clearing the OTP
export const { setUser } = userSlice.actions;

// Export the reducer to include in the store
export default userSlice.reducer;
