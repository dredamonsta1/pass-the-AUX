// // src/store/authSlice.tsx
// import { createSlice } from "@reduxjs/toolkit";

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: null,
//     token: null,
//     isLoggedIn: false,
//   },
//   reducers: {
//     setCredentials: (state, action) => {
//       const { user, token } = action.payload;
//       state.user = user;
//       state.token = token;
//       state.isLoggedIn = true;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isLoggedIn = false;
//       localStorage.removeItem("token");
//     },
//   },
// });

// export const { setCredentials, logout } = authSlice.actions;

// export default authSlice.reducer;

// // Selector to easily check login status
// export const selectIsLoggedIn = (state) => state.auth.isLoggedIn; // <--- This needs to exist!
// export const selectCurrentUser = (state) => state.auth.user;
// export const selectCurrentToken = (state) => state.auth.token;



//********************New Code*********************


// src/store/authSlice.tsx
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Import RootState from your store for type-safe selectors
import type { RootState } from "../redux/store";

// Define the shape of the user object that will be stored in Redux
interface User {
  id: number;
  username: string;
  role: string;
  // Add other user properties you might store here
}

// Define the shape of your authentication state
interface AuthState {
  user: User | null; // User can be a User object or null
  token: string | null; // Token can be a string or null
  isLoggedIn: boolean;
}

// Define the initial state with the AuthState type
const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState, // Use the typed initialState
  reducers: {
    // Define the payload type for setCredentials
    setCredentials: (
      state: AuthState, // Explicitly type the state parameter
      action: PayloadAction<{ user: User | null; token: string | null }> // Type action.payload
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isLoggedIn = !!token; // isLoggedIn is true if token exists, false otherwise
    },
    logout: (state: AuthState) => { // Explicitly type the state parameter
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token"); // Clear token from localStorage on logout
    },
  },
});

// Export actions
export const { setCredentials, logout } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;

// --- Type-safe Selectors ---
// Use RootState to correctly type the state parameter in selectors
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
