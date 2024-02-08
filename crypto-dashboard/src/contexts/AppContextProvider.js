// AppContextProvider.js
import React from 'react';
import { DashboardProvider } from './DashboardContext';
import { CryptoDataProvider } from './CryptoDataContext';

export const AppContextProvider = ({ children }) => (
    <DashboardProvider>
        <CryptoDataProvider>
                {children}
        </CryptoDataProvider>
    </DashboardProvider>
);
