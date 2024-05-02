// store.jsx
import { configureStore } from '@reduxjs/toolkit';
import loadingReducer, { setLoading } from './slices/loadingSlice';

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
  },
});

export { setLoading }; 
