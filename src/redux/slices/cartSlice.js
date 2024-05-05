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
      }
    },
  },
});
export const { setCartData, updateCartQty, calculateTotalQty } =
  cartSlice.actions;
export default cartSlice.reducer;
