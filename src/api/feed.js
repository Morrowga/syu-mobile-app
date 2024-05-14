import { createAsyncThunk } from "@reduxjs/toolkit";
import { HTTP } from "./http";
import storage from "../storage/storage";

export const categories = createAsyncThunk(
  "app/category",
  async (data, { rejectWithValue }) => {
    try {
      let response = await HTTP.get("categories");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
