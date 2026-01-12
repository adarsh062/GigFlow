import { createSlice } from '@reduxjs/toolkit';

// Check if user is in localStorage immediately
const storedUser = localStorage.getItem("user");
const initialState = {
  currentUser: storedUser ? JSON.parse(storedUser) : null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
      // Clear from localStorage
      localStorage.removeItem("user");
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;

export default userSlice.reducer;