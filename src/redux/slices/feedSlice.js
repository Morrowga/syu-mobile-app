// feedSlice.jsx
import { createSlice } from "@reduxjs/toolkit";
import { getCategories, getFeeds } from "../../api/feed";

const initialState = {
  isLoading: false,
  isError: false,
  categories: [],
  feeds: [],
  feed_last_page: 0,
  error_message: "",
  next_page: 1,
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
    clearFeedData: (state, { payload }) => {
      state.feeds = [];
      state.next_page = 1;
    },
    clearCategoryData: (state, { payload }) => {
      state.categories = [];
      state.next_page = 1;
    },
    toggleWishlist: (state, action) => {
      const { product_id } = action.payload;
      const index = state.feeds.findIndex((item) => item.id === product_id);
      if (index !== -1) {
        const item = state.feeds[index];
        item.isWishlist = !item.isWishlist;
      }
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
        state.categories = payload?.data?.data;
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
        state.next_page += 1;
        state.feeds = state.feeds.concat(payload.data.data);
        state.feed_last_page = payload?.data.last_page;
      })
      .addCase(getFeeds.rejected, (state, { payload }) => {
        state.isError = true;
        state.error_message = payload;
      });
  },
});
export const {
  startLoading,
  clearError,
  clearFeedData,
  clearCategoryData,
  toggleWishlist,
} = feedSlice.actions;
export default feedSlice.reducer;
