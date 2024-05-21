// store.jsx
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import loadingSlice from "./slices/loadingSlice";
import navigatorSlice from "./slices/navigatorSlice";
import cartSlice from "./slices/cartSlice";
import feedSlice from "./slices/feedSlice";
import themeSlice from "./slices/themeSlice";
import wishlistSlice from "./slices/wishlistSlice";
import paymentSlice from "./slices/paymentSlice";
import orderSlice from "./slices/orderSlice";

export const store = configureStore({
  reducer: {
    loading: loadingSlice,
    auth: authSlice,
    feed: feedSlice,
    wishlist: wishlistSlice,
    order: orderSlice,
    navigation: navigatorSlice,
    cart: cartSlice,
    theme: themeSlice,
    payment: paymentSlice,
  },
});
