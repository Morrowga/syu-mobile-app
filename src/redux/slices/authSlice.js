// loadingSlice.jsx
import { createSlice } from "@reduxjs/toolkit";
import { getUserData, login, logout, verifyOtp } from "../../api/auth";

const initialState = {
  isAuth: false,
  isLoading: false,
  isError: false,
  authData: null,
  msisdn: "",
  isApiRun: false,
  error_message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    clearError: (state) => {
      state.isError = false;
      state.error_message = "";
    },
  },
  extraReducers: (builder) => {
    // login
    builder
      .addCase(login.pending, (state) => {
        state.isError = false;
        state.error_message = "";
        state.isApiRun = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.msisdn = payload?.data.msisdn;
        state.isApiRun = false;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isApiRun = false;
        state.isError = true;
        state.error_message = payload;
      });

    //verify otp
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.isError = false;
        state.error_message = "";
        state.isApiRun = true;
      })
      .addCase(verifyOtp.fulfilled, (state, { payload }) => {
        state.isAuth = true;
        state.authData = payload.data;
        state.isApiRun = false;
        state.msisdn = "";
      })
      .addCase(verifyOtp.rejected, (state, { payload }) => {
        state.isApiRun = false;
        state.isError = true;
        state.error_message = payload;
      });

    // get user data
    builder
      .addCase(getUserData.pending, (state) => {
        state.isError = false;
        state.error_message = "";
        state.isLoading = true;
      })
      .addCase(getUserData.fulfilled, (state, { payload }) => {
        state.authData = payload;
        state.isLoading = false;
        state.isAuth = true;
      })
      .addCase(getUserData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isAuth = false;
        state.isError = true;
        // state.error_message = payload;
      });

    //logout user
    builder
      .addCase(logout.pending, (state) => {
        state.isError = false;
        state.error_message = "";
        state.isApiRun = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.authData = null;
        state.isApiRun = false;
        state.isAuth = false;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.isApiRun = true;
        state.isAuth = false;
        state.isError = true;
        state.error_message = payload;
      });
  },
});
export const { startLoading, clearError } = authSlice.actions;
export default authSlice.reducer;
