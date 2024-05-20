import { createAsyncThunk } from "@reduxjs/toolkit";
import { HTTP } from "./http";
import storage from "../storage/storage";

export const getWishlists = createAsyncThunk(
  "app/wishlist",
  async (filter, { rejectWithValue }) => {
    try {
      let response = await HTTP.get("wishlists?page="+ filter?.page +"category=" + filter?.category_id + '&q=' + filter?.q);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

