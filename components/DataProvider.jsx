"use client"
import React, { ReactNode } from 'react';
import store from "../store/reduxstore"
import { Provider } from 'react-redux';

const DataProvider = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default DataProvider;
