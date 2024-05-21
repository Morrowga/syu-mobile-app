import { createSelector } from "@reduxjs/toolkit";
const selectCategories = (state) => state.feed.categories;
const selectOrderDetail = (state) => state.order.order_detail;

export const selectCategorizedProducts = createSelector(
  [selectCategories, selectOrderDetail],
  (categories, order_detail) => {
    const categorizedProducts = categories
      .map((category) => {
        const productsInCategory = order_detail?.products?.filter(
          (product) => product.category_id === category.id
        );
        if (productsInCategory?.length > 0) {
          const totalAmt = productsInCategory.reduce(
            (acc, curr) => acc + curr.total_amt,
            0
          );
          const totalQty = productsInCategory.reduce(
            (acc, curr) => acc + curr.qty,
            0
          );

          return {
            category: category.name,
            total_amt: totalAmt,
            total_qty: totalQty,
          };
        } else {
          return null;
        }
      })
      .filter(Boolean);
    console.log(categorizedProducts);

    return categorizedProducts;
  }
);
