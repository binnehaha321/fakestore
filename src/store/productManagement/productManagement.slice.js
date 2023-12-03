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
    addProduct:(state)=>{
        state.loading = true;
    },
    addProductSuccess: (state,action) =>{
        state.loading = false;
        state.products= action.payload;
    },
    addProductFailed : (state,action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
    }
}
})

export const {addProduct, addProductSuccess, addProductFailed} = productManagementSlice.actions
export default productManagementSlice.reducer;