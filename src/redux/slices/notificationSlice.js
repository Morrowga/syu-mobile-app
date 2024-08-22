import { createSlice } from "@reduxjs/toolkit";
import { clearNotification, deleteNotification, getNotifications, readNotification } from "../../api/notification";

const initialState = {
  notifications: [],
  isLoading: false,
  isError: false,
  error_message: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error_message = "";
      })
      .addCase(getNotifications.fulfilled, (state, { payload }) => {
        state.notifications = payload?.data;
        state.isLoading = false;
      })
      .addCase(getNotifications.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.error_message = payload;
      });
    builder
      .addCase(deleteNotification.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error_message = "";
      })
      .addCase(deleteNotification.fulfilled, (state, { payload }) => {
        console.log(payload)
        state.isLoading = false;
      })
      .addCase(deleteNotification.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.error_message = payload;
      });
    builder
      .addCase(readNotification.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error_message = "";
      })
      .addCase(readNotification.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(readNotification.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.error_message = payload;
      });

    builder
      .addCase(clearNotification.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error_message = "";
      })
      .addCase(clearNotification.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.notifications = [];
      })
      .addCase(clearNotification.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.error_message = payload;
      });
  },
});

export default notificationSlice.reducer;
