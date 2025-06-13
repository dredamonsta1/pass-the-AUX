// src/redux/store.tsx
import { configureStore } from "@reduxjs/toolkit";
import artistsReducer from "./reducers/artistsReducer";

// Configure the Redux store
const store = configureStore({
  reducer: {
    // 'artists' is the slice of state managed by artistsReducer
    artists: artistsReducer,
  },
  // configureStore automatically sets up Redux Thunk, which we need for async actions.
  // This simplifies async action handling compared to traditional Redux setup.
});

// Infer the `RootState` type from the store itself
// This type represents the entire Redux state tree
export type RootState = ReturnType<typeof store.getState>;

// Infer the `AppDispatch` type from the store's dispatch method
// This type helps in correctly typing the dispatch function, especially for async thunks
export type AppDispatch = typeof store.dispatch;

// Export the configured store as the default export
export default store;
