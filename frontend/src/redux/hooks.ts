// src/redux/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// Corrected: Removed '.ts' extension from the import path for local module
import type { RootState, AppDispatch } from './store'; 

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// This makes sure your `dispatch` calls are correctly typed for thunks
export const useAppDispatch: () => AppDispatch = useDispatch;
// This makes sure your `useSelector` calls are correctly typed with your `RootState`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
