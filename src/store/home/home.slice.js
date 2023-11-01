import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    error:null,
    loading:false,
}

const homeSlice = createSlice({
    name:"home",
    initialState,
    reducers:{
    loadProduct:(state,action)=>{
        state.loading = true;
        state.products= action.payload;
    },
    loadProductSuccess: (state) =>{
        state.loading = false;
    },
    loadProductFailed : (state,action) => {
        state.loading = false;
        state.error = action.payload;
    }
}
})

export const {loadProduct, loadProductSuccess, loadProductFailed} = homeSlice.actions
export default homeSlice.reducer;