import { createAsyncThunk } from "@reduxjs/toolkit";
import { HTTP } from "./http";
import storage from "../storage/storage";

export const getOrders = createAsyncThunk(
  "app/order",
  async (page, { rejectWithValue }) => {
    try {
      let response = await HTTP.get("orders?page="+ page);
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

