import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    error:null,
    loading:false,
}

const productManagementSlice = createSlice({
    name: "productManagement",
    initialState,
    reducers:{
    addProduct:(state,action)=>{
        state.loading = true;
        state.products= action.payload;
    },
    addProductSuccess: (state) =>{
        state.loading = false;
    },
    addProductFailed : (state,action) => {
        state.error = action.payload;
        state.loading = false;
    }
}
})

export const {addProduct, addProductSuccess, addProductFailed} = productManagementSlice.actions
export default productManagementSlice.reducer;