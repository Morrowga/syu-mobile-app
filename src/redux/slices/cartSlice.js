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
      const { id, size, sizes, qualities } = action.payload;
      const index = state.cartData.findIndex((item) => item.id === id);
      if (index !== -1) {
        const currentSize = sizes.find((s) => s.id === size);
        if (currentSize) {
          const item = state.cartData[index];
          const qualityPrice =
            qualities.find((q) => q.id === item.quality)?.price || 0;
          item.size = size;
          item.price = Number(currentSize.price) + Number(qualityPrice);
          item.totalPrice = item.qty * item.price;
        }
      }
    },
    updateQuality: (state, action) => {
      const { id, quality, sizes, qualities } = action.payload;
      const index = state.cartData.findIndex((item) => item.id === id);
      if (index !== -1) {
        const currentQuality = qualities.find((q) => q.id === quality);
        if (currentQuality) {
          const item = state.cartData[index];
          const sizePrice = sizes.find((s) => s.id === item.size)?.price || 0;
          item.quality = quality;
          item.price = Number(sizePrice) + Number(currentQuality.price);
          item.totalPrice = item.qty * item.price;
        }
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
