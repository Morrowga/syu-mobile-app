import { createAsyncThunk } from "@reduxjs/toolkit";
import { HTTP } from "./http";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (data, { rejectWithValue }) => {
    try {
      let response = await HTTP.post("/orders", data);
      console.log(response.data);
      return response.data.data;
    } catch {
      return rejectWithValue(error.message);
    }
  }
);

export const getOrders = createAsyncThunk(
  "app/order",
  async (page, { rejectWithValue }) => {
    try {
      let response = await HTTP.get("orders?page=" + page);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getOrderDetail = createAsyncThunk(
  "app/order-detail",
  async (orderId, { rejectWithValue }) => {
    try {
      let response = await HTTP.get("orders/detail/" + orderId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);