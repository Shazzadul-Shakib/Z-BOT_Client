import { configureStore } from "@reduxjs/toolkit";
import otpReducer from "./slices/otpSlice";
import userReducer from "./slices/userSlice";
import { usersApi } from "./api/users-api";
import storage from "redux-persist/lib/storage"; // This uses localStorage for web
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { projectsApi } from "./api/projects-api";
import { financeApi } from "./api/finance-api";

// Redux Persist configuration
const persistConfig = {
  key: "root", // Key for localStorage
  storage: storage, // You can also explicitly mention 'localStorage' here
  whitelist: ["user"], // Only persist the 'user' slice
};

// Combine reducers
const rootReducer = combineReducers({
  [usersApi.reducerPath]: usersApi.reducer,
  [projectsApi.reducerPath]: projectsApi.reducer,
  [financeApi.reducerPath]: financeApi.reducer,

  otp: otpReducer,
  user: userReducer,
});

// Apply persistence to the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with middleware for Redux Toolkit and Redux Persist
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      usersApi.middleware,
      projectsApi.middleware,
      financeApi.middleware,
    ),
});

// Create a persistor to be used in the app
export const persistor = persistStore(store);
