import { createAsyncThunk } from "@reduxjs/toolkit";
import { HTTP } from "./http";

export const getNotifications = createAsyncThunk(
  "app/getNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await HTTP.get("notifications");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteNotification = createAsyncThunk(
    "app/deleteNotification",
    async (id, { rejectWithValue }) => {
      try {
        const response = await HTTP.post("notifications/delete/" + id);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
);
  
export const readNotification = createAsyncThunk(
    "app/readNotification",
    async (id, { rejectWithValue }) => {
        try {
            const response = await HTTP.post("notifications/read/" + id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }   
    }
);


export const clearNotification = createAsyncThunk(
    "app/clearNotification",
    async (_, { rejectWithValue }) => {
        try {
            const response = await HTTP.post("notifications/clear");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }   
    }
);