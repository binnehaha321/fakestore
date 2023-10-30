import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    products:[],
    error:null,
    loading: false,
}
const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts: (state,action) =>{
            state.products= action.payload;
        },
        quantityFilter: (state,action) =>{
            const quantity = action.payload;
            state.products =  state.products.slice(0,quantity)
        },
        setIsLoading: (state,action) =>{
            state.loading = action.payload;
        }
        },
});


export const {setProducts, quantityFilter, setIsLoading} = productSlice.actions;
export default productSlice.reducer;