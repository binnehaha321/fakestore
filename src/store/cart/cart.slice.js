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
      addProduct: (state, action) => {
        state.products = action.payload;
        state.error = null; // Reset error if products are inserted successfully
      },
      setIsLoading: (state, action) => {
        state.loading = action.payload;
      },
      setError: (state, action) => {
        state.error = action.payload;
        state.loading = false; // Set loading to false when an error occurs
      },
    },
  });

  export const { addProduct, setIsLoading, setError } = cartSlice.actions;
  export default cartSlice.reducer;
