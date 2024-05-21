import { createAsyncThunk } from "@reduxjs/toolkit";
import { HTTP } from "./http";

export const getThemeData = createAsyncThunk(
  "app/theme",
  async (data, { rejectWithValue }) => {
    try {
      let response = await HTTP.get("setting");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
