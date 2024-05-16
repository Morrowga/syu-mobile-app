// store.jsx
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import loadingSlice from "./slices/loadingSlice";
import navigatorSlice from "./slices/navigatorSlice";
import cartSlice from "./slices/cartSlice";
import feedSlice from "./slices/feedSlice";
import themeSlice from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    loading: loadingSlice,
    auth: authSlice,
    feed: feedSlice,
    navigation: navigatorSlice,
    cart: cartSlice,
    theme: themeSlice,
  },
});
