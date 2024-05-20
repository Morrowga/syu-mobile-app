import { createAsyncThunk } from "@reduxjs/toolkit";
import { HTTP } from "./http";
import storage from "../storage/storage";

export const getCategories = createAsyncThunk(
  "app/category",
  async (filter, { rejectWithValue }) => {
    try {
      let response = await HTTP.get("categories?per_page=" + filter?.per_page + "&page=" + filter?.page);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getFeeds = createAsyncThunk(
  "app/product",
  async (filter, { rejectWithValue }) => {
    try {
      let response = await HTTP.get("feeds?page=" + filter?.page +"&category=" + filter?.category_id + '&q=' + filter?.q);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
