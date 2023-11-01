import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    error:null,
    loading:false,
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers:{
    updateProduct:(state,action)=>{
        state.loading = true;
        state.products= action.payload;
    },
    updateProductSuccess: (state) =>{
        state.loading = false;
    },
    updateProductFailed : (state,action) => {
        state.loading = false;
        state.error = action.payload;
    }
}
})

export const {updateProduct, updateProductSuccess, updateProductFailed} = productSlice.actions
export default productSlice.reducer;