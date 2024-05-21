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

export const updatePayment = createAsyncThunk(
  "payment/updatePayment",
  async ({ formData, order_id }, { rejectWithValue }) => {
    try {
      let response = await HTTP.post("/orders/payment/" + order_id, formData, {
        headers: {
          "Custom-Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
