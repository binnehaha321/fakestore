import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/auth.slice';
import productManagementSlice from './productManagement/productManagement.slice';
const store = configureStore({
  reducer: {
    auth: authSlice,
    productsManagement: productManagementSlice,
  },
});

export default store;