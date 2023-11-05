import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    error:null,
    loading:false,
}

const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers:{
        loadProduct:(state)=>{
            state.loading = true;
        },
        loadProductSuccess: (state, action) => {
            state.loading = false;
            state.products= action.payload;
        },
        loadProductFailed : (state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export const {loadProduct, loadProductSuccess, loadProductFailed} = homeSlice.actions
export default homeSlice.reducer;