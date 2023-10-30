import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: null,
    loading: false
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
    },
    loginFail: (state, action) => {
      state.error = action.payload.error;
    },
    logoutSuccess: (state) => {
      state.user = null;
    },
    logoutFail: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { loginSuccess, loginFail, logoutSuccess, logoutFail } = authSlice.actions;
export default authSlice.reducer;
  