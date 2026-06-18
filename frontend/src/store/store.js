import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import uiReducer from '../features/uiSlice';
import userReducer from '../features/userSlice';
import dataReducer from '../features/dataSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    user: userReducer,
    data: dataReducer,
  },
});
