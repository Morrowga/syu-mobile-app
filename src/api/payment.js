import { createAsyncThunk } from "@reduxjs/toolkit";
import { HTTP } from "./http";

export const getPaymentMethods = createAsyncThunk(
  "payment/getPaymentMethods",
  async (_, { rejectWithValue }) => {
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

export const getShippingCities = createAsyncThunk(
  "payment/getShippingCities",
  async (_, { rejectWithValue }) => {
    try {
      let response = await HTTP.get("/shipping-cities");

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getCurrentUserProfile = createAsyncThunk(
  "payment/getCurrentUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      let response = await HTTP.get("/users/profile");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "payment/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      let response = await HTTP.post("/users/update-profile?_method=PUT", data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.errors);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
