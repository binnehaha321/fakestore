import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/auth.slice';
import productSlice from './product/product.slice';
import productManagementSlice from './productManagement/productManagement.slice';
const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productSlice,
    productsManagement: productManagementSlice,
  },
});

export default store;