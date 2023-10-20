import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    error:null,
    loading:false,
}

const productManagementSlice = createSlice({
    name:"productManagement",
    initialState,
    reducers:{
        addProduct: (state)=>{
            state.loading = true
        },
        addProductSuccess: (state,action)=>{
            state.products = action.payload;
            state.loading = false
        },
        addProductFail: (state, action)=>{
            state.error = action.payload;
            state.loading = false
        },
        deleteProduct:(state,action)=>{
            const index = state.products.findIndex(item => item._id === action.payload);
            if (index !== -1) {
                state.products.splice(index, 1);
            }
        },
        updateProduct:(state,action)=>{
            let updatedProducts=[...state.products]
            let targetProduct=updatedProducts.filter((product)=> product._id===action.payload)[0];
            Object.assign(targetProduct, action.updateData);
            return{...state, products:updatedProducts};
        }
    }
})

export const {addProduct, addProductSuccess, addProductFail, deleteProduct, updateProduct} = productManagementSlice.actions
export default productManagementSlice.reducer;