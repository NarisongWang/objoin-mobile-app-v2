import { configureStore } from '@reduxjs/toolkit';
import installationOrderReducer from '../features/installationOrder/installationOrderSlice';

export const store = configureStore({
  reducer: {
    installationOrder: installationOrderReducer,
  },
});
