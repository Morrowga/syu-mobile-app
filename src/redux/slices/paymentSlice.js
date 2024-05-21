// feedSlice.jsx
import { createSlice } from "@reduxjs/toolkit";
import { getPaymentMethods } from "../../api/payment";

const initialState = {
  paymentMethods: [],
  isLoading: false,
  isError: false,
  error_message: "",
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    clearError: (state) => {
      state.isError = false;
      state.error_message = "";
    },
  },
  extraReducers: (builder) => {
    // getFeeds
    builder
      .addCase(getPaymentMethods.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error_message = "";
      })
      .addCase(getPaymentMethods.fulfilled, (state, { payload }) => {
        state.paymentMethods = payload;
        state.isLoading = false;
      })
      .addCase(getPaymentMethods.rejected, (state, { payload }) => {
        state.isError = true;
        state.isLoading = false;
        state.error_message = payload;
      });
  },
});
export const { clearError } = paymentSlice.actions;
export default paymentSlice.reducer;
