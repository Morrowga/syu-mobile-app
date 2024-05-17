// wishlistSlice.jsx
import { createSlice } from "@reduxjs/toolkit";
import { getWishlists } from "../../api/wishlist";

const initialState = {
  isLoading: false,
  isError: false,
  wishlists: [],
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
  },
  extraReducers: (builder) => {
    // getWishlists
    builder
      .addCase(getWishlists.pending, (state) => {
        state.isError = false;
        state.error_message = "";
      })
      .addCase(getWishlists.fulfilled, (state, { payload }) => {
        state.wishlists = payload?.data;
      })
      .addCase(getWishlists.rejected, (state, { payload }) => {
        state.isError = true;
        state.error_message = payload;
      });
  },
});
export const { startLoading, clearError } = wishlistSlice.actions;
export default wishlistSlice.reducer;
