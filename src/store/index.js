import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/auth.slice';

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;