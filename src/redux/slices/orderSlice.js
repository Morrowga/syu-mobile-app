// wishlistSlice.jsx
import { createSlice } from "@reduxjs/toolkit";
import { getOrders,getOrderDetail } from "../../api/order";

const initialState = {
  isLoading: false,
  isError: false,
  orders: [],
  order_detail: [],
  next_page: 1,
  error_message: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    clearError: (state) => {
      state.isError = false;
      state.error_message = "";
    },
    clearOrderData: (state, { payload }) => {
      state.orders = [];
      state.next_page = 1;
    },
  },
  extraReducers: (builder) => {
    // getOrders
    builder
      .addCase(getOrders.pending, (state) => {
        state.isError = false;
        state.error_message = "";
      })
      .addCase(getOrders.fulfilled, (state, { payload }) => {
        state.next_page += 1;
        state.orders = state.orders.concat(payload.data.data);
      })
      .addCase(getOrders.rejected, (state, { payload }) => {
        state.isError = true;
        state.error_message = payload;
      });

    // getOrderDetail
    builder
    .addCase(getOrderDetail.pending, (state) => {
      state.isError = false;
      state.error_message = "";
    })
    .addCase(getOrderDetail.fulfilled, (state, { payload }) => {
      state.order_detail = payload?.data;
    })
    .addCase(getOrderDetail.rejected, (state, { payload }) => {
      state.isError = true;
      state.error_message = payload;
    });
  },
});
export const { startLoading, clearError,clearOrderData } = orderSlice.actions;
export default orderSlice.reducer;