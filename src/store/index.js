import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/auth.slice';
import productSlice from './product/product.slice';
import productManagementSlice from './productManagement/productManagement.slice';
import cartSlice from './cart/cart.slice';
const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productSlice,
    productsManagement: productManagementSlice,
    cart:cartSlice,
  },
});

export default store;