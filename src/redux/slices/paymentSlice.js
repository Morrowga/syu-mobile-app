// feedSlice.jsx
import { createSlice } from "@reduxjs/toolkit";
import {
  getPaymentMethods,
  getShippingCities,
  updatePayment,
  updateProfile,
} from "../../api/payment";

const initialState = {
  paymentMethods: [],
  shipping_cities: [],
  isLoading: false,
  isError: false,
  error_message: "",
  be_errors: {},
  isFormError: false,
  isFormLoading: false,
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
    // get payments
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

    // update payment
    builder
      .addCase(updatePayment.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error_message = "";
      })
      .addCase(updatePayment.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(updatePayment.rejected, (state, { payload }) => {
        state.isError = true;
        state.isLoading = false;
        state.error_message = payload;
      });

    // get cities
    builder
      .addCase(getShippingCities.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error_message = "";
      })
      .addCase(getShippingCities.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.shipping_cities = payload;
      })
      .addCase(getShippingCities.rejected, (state, { payload }) => {
        state.isError = true;
        state.isLoading = false;
        state.error_message = payload;
      });

    builder
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(updateProfile.rejected, (state, { payload }) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});
export const { clearError } = paymentSlice.actions;
export default paymentSlice.reducer;
