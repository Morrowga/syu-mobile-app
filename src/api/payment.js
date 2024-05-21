import { createAsyncThunk } from "@reduxjs/toolkit";
import { HTTP } from "./http";

export const getPaymentMethods = createAsyncThunk(
  "payment/getPaymentMethods",
  async (data, { rejectWithValue }) => {
    try {
      let response = await HTTP.get("/orders/payment-methods");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
