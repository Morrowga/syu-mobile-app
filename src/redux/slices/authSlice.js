// loadingSlice.jsx
import { createSlice } from "@reduxjs/toolkit";
import { getUserData, login, logout, verifyOtp } from "../../api/auth";

const initialState = {
  isAuth: false,
  isLoading: false,
  isError: false,
  authData: null,
  msisdn: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.msisdn = payload?.data.msisdn;
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = false;
    });

    //verify otp
    builder.addCase(verifyOtp.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(verifyOtp.fulfilled, (state, { payload }) => {
      state.isAuth = true;
      state.authData = payload.data;
      state.isLoading = false;
      state.msisdn = "";
    });
    builder.addCase(verifyOtp.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = false;
    });

    // get user data
    builder.addCase(getUserData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.authData = action.payload.data;
      state.isLoading = false;
      state.isAuth = true;
    });
    builder.addCase(getUserData.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuth = false;
    });

    //logout user
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.authData = null;
      state.isLoading = false;
      state.isAuth = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      console.log(action.payload, "logout");
      // state.isLoading = false;
      // state.isAuth = false;
    });
  },
});
export const { startLoading } = authSlice.actions;
export default authSlice.reducer;
