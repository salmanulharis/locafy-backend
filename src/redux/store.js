import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

// Configure the Redux store with the slice reducer
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
