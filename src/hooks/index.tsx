import React from 'react'
import { GlobalProvider } from './global';
import { AuthProvider } from './auth';

const AppProvider: React.FC = ({ children }) => {
    return (
        <GlobalProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </GlobalProvider>
    )
}

export default AppProvider;