import { createSlice, createSelector } from "@reduxjs/toolkit";
const initialState = {
  cartData: [],
  total_qty: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartData: (state, action) => {
      state.cartData.push(action.payload);
    },

    updateCartQty: (state, action) => {
      const { id, qty } = action.payload;
      const index = state.cartData.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.cartData[index].qty += qty;
        state.cartData[index].totalPrice =
          state.cartData[index].price * state.cartData[index].qty;
      }
    },

    increaseCartQty: (state, action) => {
      const index = state.cartData.findIndex(
        (item) => item.id === action.payload
      );
      if (index !== -1) {
        state.cartData[index].qty += 1;
        state.cartData[index].totalPrice =
          state.cartData[index].price * state.cartData[index].qty;
      }
    },

    decreaseCartQty: (state, action) => {
      const index = state.cartData.findIndex(
        (item) => item.id === action.payload
      );

      if (index !== -1 && state.cartData[index].qty > 1) {
        state.cartData[index].qty -= 1;
        state.cartData[index].totalPrice =
          state.cartData[index].price * state.cartData[index].qty;
      } else if (state.cartData[index].qty === 1) {
        state.cartData.splice(index, 1);
      }
    },

    updateCartQtyByInput: (state, action) => {
      const { id, qty } = action.payload;
      const index = state.cartData.findIndex((item) => item.id === id);
      if (index !== -1 && qty >= 1) {
        state.cartData[index].qty = qty;
        state.cartData[index].totalPrice = state.cartData[index].price * qty;
      }
    },

    updateSize: (state, action) => {
      const { id, size } = action.payload;
      const index = state.cartData.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.cartData[index].size = size;
      }
    },
    updateQuality: (state, action) => {
      const { id, quality } = action.payload;
      const index = state.cartData.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.cartData[index].quality = quality;
      }
    },

    deleteItem: (state, action) => {
      const index = state.cartData.findIndex(
        (item) => item.id === action.payload
      );
      if (index !== -1) {
        state.cartData.splice(index, 1);
      }
    },

    deleteAllCartData: (state) => {
      state.cartData = [];
    },
  },
});
export const {
  setCartData,
  updateCartQty,
  calculateTotalQty,
  increaseCartQty,
  decreaseCartQty,
  updateCartQtyByInput,
  updateSize,
  updateQuality,
  deleteItem,
  deleteAllCartData,
} = cartSlice.actions;
export default cartSlice.reducer;
