import { configureStore } from "@reduxjs/toolkit";
import otpReducer from "./slices/otpSlice"
import { usersApi } from "./api/users-api";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]:usersApi.reducer,
    otp:otpReducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware)
});
