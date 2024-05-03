// loadingSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  isLoading: false,
  authData: [],
};

export const getAuth = () => async (dispatch) => {
  dispatch(startLoading());

  setTimeout(() => {
    dispatch(authFail());
  }, 2000);
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    authSuccess: (state) => {
      state.isLoading = false;
      state.isAuth = true;
    },
    authFail: (state) => {
      state.isLoading = false;
      state.isAuth = false;
    },
  },
});

export const { startLoading, authSuccess, authFail } = authSlice.actions;

export default authSlice.reducer;
