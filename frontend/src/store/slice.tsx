// src/store/authSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  // Define user properties as needed, e.g.:
  id: string;
  name: string;
  email: string;
  // ...add more fields as needed
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false, // Derived state
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token"); // Clear token from localStorage on logout
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export interface RootState {
  auth: AuthState;
}

// Selector to easily check login status
export const selectIsLoggedIn = (state: RootState): boolean => state.auth.isLoggedIn;
export const selectCurrentUser = (state: RootState): User | null => state.auth.user;
export const selectCurrentToken = (state: RootState): string | null => state.auth.token;
