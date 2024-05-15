// feedSlice.jsx
import { createSlice } from "@reduxjs/toolkit";
import { getCategories, getFeeds } from "../../api/feed";

const initialState = {
  isLoading: false,
  isError: false,
  categories: [],
  feeds: [],
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

    // getFeeds
    builder
    .addCase(getFeeds.pending, (state) => {
      state.isError = false;
      state.error_message = "";
    })
    .addCase(getFeeds.fulfilled, (state, { payload }) => {
      state.feeds = payload?.data;
    })
    .addCase(getFeeds.rejected, (state, { payload }) => {
      state.isError = true;
      state.error_message = payload;
    });
  },
});
export const { startLoading, clearError } = feedSlice.actions;
export default feedSlice.reducer;
