  import { createSlice } from "@reduxjs/toolkit";

  const initialState = {
    products: [],
    error: null,
    loading: false,
  };

  const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      updateProduct: (state) => {
        state.loading = true;
      },
      updateProductSuccess : (state,action) =>{
        state.loading = false;
        state.products = action.payload;
      },
      updateProductFailed : (state,action) => {
        state.loading = false;
        state.error = action.payload;
      },
      // addProduct: (state) => {
      //   state.loading = true;
      // },
      // addProductSuccess : (state,action) =>{
      //   state.loading = false;
      //   state.products = [...state.products,action.payload];
      // },
      // addProductFailed : (state,action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // }
    },
  });

  export const { updateProduct, updateProductFailed, updateProductSuccess } = cartSlice.actions;
  export default cartSlice.reducer;
