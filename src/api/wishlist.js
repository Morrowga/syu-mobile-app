import { createAsyncThunk } from "@reduxjs/toolkit";
import { HTTP } from "./http";
import storage from "../storage/storage";

export const getWishlists = createAsyncThunk(
  "app/wishlist",
  async (filter, { rejectWithValue }) => {
    try {
      let response = await HTTP.get(
        "wishlists?page=" +
          filter?.page +
          "&category=" +
          filter?.category_id +
          "&q=" +
          filter?.q
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addWishlist = createAsyncThunk(
  "wishlist/add",
  async (data, { rejectWithValue }) => {
    try {
      let response = await HTTP.post("/wishlists", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeWishlist = createAsyncThunk(
  "wishlist/remove",
  async (data, { rejectWithValue }) => {
    try {
      let response = await HTTP.post(
        "/wishlists/" + data.product_id + "?_method=DELETE"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
