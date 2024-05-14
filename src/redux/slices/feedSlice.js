// feedSlice.jsx
import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "../../api/feed";

const initialState = {
  isLoading: false,
  isError: false,
  categories: "",
  error_message: "",
};

export const feedSlice = createSlice({
  name: "feed",
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
    // getCategories
    builder
      .addCase(getCategories.pending, (state) => {
        state.isError = false;
        state.error_message = "";
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.categories = payload?.data;
      })
      .addCase(getCategories.rejected, (state, { payload }) => {
        state.isError = true;
        state.error_message = payload;
      });
  },
});
export const { startLoading, clearError } = feedSlice.actions;
export default feedSlice.reducer;
