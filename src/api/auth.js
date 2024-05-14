import { createAsyncThunk } from "@reduxjs/toolkit";
import { HTTP } from "./http";
import storage from "../storage/storage";

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      let response = await HTTP.post("login", { msisdn: data.msisdn });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verify_otp",
  async (data, { rejectWithValue }) => {
    try {
      let response = await HTTP.post("verify-otp", {
        msisdn: data.msisdn,
        otp: data.otp,
      });

      if (response && response.data) {
        storage.save({
          key: "authState",
          data: response.data.data,
          token: response.data.token,
        });
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserData = createAsyncThunk(
  "auth/getUserData",
  async (data, { rejectWithValue }) => {
    try {
      const response = await storage.load({ key: "authState" });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      let response = await HTTP.post("logout");
      storage.remove({ key: "authState" });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resendOtp = createAsyncThunk(
  "auth/resend_otp",
  async (data, { rejectWithValue }) => {
    try {
      let response = await HTTP.post("send-otp", {
        msisdn: data.msisdn,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
