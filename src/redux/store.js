// store.jsx
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import loadingSlice from "./slices/loadingSlice";
import navigatorSlice from "./slices/navigatorSlice";

export const store = configureStore({
  reducer: {
    loading: loadingSlice,
    auth: authSlice,
    navigation: navigatorSlice,
  },
});
