// wishlistSlice.jsx
import { createSlice } from "@reduxjs/toolkit";
import { addWishlist, getWishlists, removeWishlist } from "../../api/wishlist";

const initialState = {
  isLoading: false,
  isError: false,
  wishlists: [],
  next_page: 1,
  last_page: 0,
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
        state.isLoading = true;
        state.isError = false;
        state.error_message = "";
      })
      .addCase(getWishlists.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.wishlists = state.wishlists.concat(payload.data.data)
        state.last_page = payload?.data.last_page;
        state.next_page = state.next_page + 1;
      })
      .addCase(getWishlists.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.error_message = payload;
      });

    builder
      .addCase(addWishlist.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error_message = "";
      })
      .addCase(addWishlist.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(addWishlist.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.error_message = payload;
      });

    builder
      .addCase(removeWishlist.pending, (state) => {
        state.isLoading = true;

        state.isError = false;
        state.error_message = "";
      })
      .addCase(removeWishlist.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(removeWishlist.rejected, (state, { payload }) => {
        state.isLoading = false;

        state.isError = true;
        state.error_message = payload;
      });
  },
});
export const { startLoading, clearError, clearWishlistData } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;