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
    updateProduct:(state)=>{
        state.loading = true;
    },
    updateProductSuccess: (state,action) =>{
        state.loading = false;
        state.products= action.payload;
    },
    updateProductFailed : (state,action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
    }
}
})

export const {updateProduct, updateProductSuccess, updateProductFailed} = productSlice.actions
export default productSlice.reducer;