import { createSlice } from "@reduxjs/toolkit";
import { getThemeData } from "../../api/theme";

const initialState = {
  splash_slogan: "",
  app_bg_color: "#ffffff",
  app_text_color: "#000000",
  app_button_color: "#007bff",
  app_logo_img: null,
  banners: [],
  isLoading: false,
  isError: false,
  error_message: "",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getThemeData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error_message = "";
      })
      .addCase(getThemeData.fulfilled, (state, { payload }) => {
        state.app_bg_color = payload.app_bg_color ?? state.app_bg_color;
        state.app_text_color = payload.app_text_color ?? state.app_text_color;
        state.app_button_color =
          payload.app_button_color ?? state.app_button_color;
        state.app_logo_img = payload.app_logo_img;
        state.banners = payload.banners;
        state.splash_slogan = payload.splash_slogan;
        state.isLoading = false;
      })
      .addCase(getThemeData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.error_message = payload;
      });
  },
});

export default themeSlice.reducer;
