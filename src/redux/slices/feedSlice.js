// feedSlice.jsx
import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "../../api/feed";

const initialState = {
  isLoading: false,
  isError: false,
  categories: "",
  isApiRun: false,
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
        state.isApiRun = true;
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.categories = payload?.data;
        state.isApiRun = false;
      })
      .addCase(getCategories.rejected, (state, { payload }) => {
        state.isApiRun = false;
        state.isError = true;
        state.error_message = payload;
      });
  },
});
export const { startLoading, clearError } = feedSlice.actions;
export default feedSlice.reducer;
