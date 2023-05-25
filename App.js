import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import AppRoutes from './src/navigation/AppRoutes';

export default function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}
