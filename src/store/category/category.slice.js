import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    error:null,
    loading:false,
}

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers:{
        loadCategory:(state)=>{
            state.loading = true;
        },
        loadCategorySuccess: (state, action) => {
            state.loading = false;
            state.categories= action.payload;
        },
        loadCategoryFailed : (state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export const {loadCategory, loadCategorySuccess, loadCategoryFailed} = categorySlice.actions
export default categorySlice.reducer;