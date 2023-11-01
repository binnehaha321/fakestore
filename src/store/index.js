import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/auth.slice';
import productSlice from './product/product.slice';
import productManagementSlice from './productManagement/productManagement.slice';
import cartSlice from './cart/cart.slice';
import homeSlice from './home/home.slice';
const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productSlice,
    productsManagement: productManagementSlice,
    cart:cartSlice,
    home: homeSlice,
  },
});

export default store;