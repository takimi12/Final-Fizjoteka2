"use client";
import React, { ReactNode } from 'react';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './Store';

type ProviderComponentProps = {
  children: ReactNode;
};

const ProviderComponent: React.FC<ProviderComponentProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ProviderComponent;
