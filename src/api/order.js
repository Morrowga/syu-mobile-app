import { createAsyncThunk } from "@reduxjs/toolkit";
import { HTTP } from "./http";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (data, { rejectWithValue }) => {
    try {
      let response = await HTTP.post("/orders", data);
      console.log(response.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
