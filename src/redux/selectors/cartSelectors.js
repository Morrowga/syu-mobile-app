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
      const { category_id, category_name, qty, totalPrice } = item;
      if (categoryTotalQty[category_name]) {
        categoryTotalQty[category_name].qty += qty;
        categoryTotalQty[category_name].totalPrice += totalPrice;
      } else {
        categoryTotalQty[category_name] = { category_id, qty, totalPrice };
      }
    });

    const result = Object.keys(categoryTotalQty).map((category_name) => ({
      category_id: categoryTotalQty[category_name].category_id,
      category_name,
      qty: categoryTotalQty[category_name].qty,
      totalPrice: categoryTotalQty[category_name].totalPrice,
    }));

    return result;
  }
);

export const selectTotalPrice = createSelector([selectCartData], (cartData) =>
  cartData.reduce((total, item) => total + item.totalPrice, 0)
);
