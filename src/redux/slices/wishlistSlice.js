// wishlistSlice.jsx
import { createSlice } from "@reduxjs/toolkit";
import { getWishlists } from "../../api/wishlist";

const initialState = {
  isLoading: false,
  isError: false,
  wishlists: [],
  next_page: 1,
  error_message: "",
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    clearError: (state) => {
      state.isError = false;
      state.error_message = "";
    },
    clearWishlistData: (state, { payload }) => {
      state.wishlists = [];
      state.next_page = 1;
    },
  },
  extraReducers: (builder) => {
    // getWishlists
    builder
      .addCase(getWishlists.pending, (state) => {
        state.isError = false;
        state.error_message = "";
      })
      .addCase(getWishlists.fulfilled, (state, { payload }) => {
        state.next_page += 1;
        state.wishlists = state.wishlists.concat(payload.data.data);
      })
      .addCase(getWishlists.rejected, (state, { payload }) => {
        state.isError = true;
        state.error_message = payload;
      });
  },
});
export const { startLoading, clearError,clearWishlistData } = wishlistSlice.actions;
export default wishlistSlice.reducer;
