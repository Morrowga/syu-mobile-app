import { createSelector } from "@reduxjs/toolkit";

export const selectCartData = (state) => state.cart.cartData;

export const selectTotalQuantity = createSelector(
  [selectCartData],
  (cartData) => cartData.reduce((total, item) => total + item.qty, 0)
);

export const getCategoryFromState = createSelector(
  [selectCartData],
  (cartData) => {
    const categoryTotalQty = {};

    cartData.forEach((item) => {
      const { category_id, category_name, qty } = item;
      if (categoryTotalQty[category_name]) {
        categoryTotalQty[category_name].qty += qty;
      } else {
        categoryTotalQty[category_name] = { category_id, qty };
      }
    });

    const result = Object.keys(categoryTotalQty).map((category_name) => ({
      category_id: categoryTotalQty[category_name].category_id,
      category_name,
      qty: categoryTotalQty[category_name].qty,
    }));

    return result;
  }
);
