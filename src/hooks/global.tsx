import React, { createContext, useContext, useState } from 'react';
import { Socket } from 'socket.io-client';

interface GlobalContextData {
    friendshipId: string;
    setFriendshipId(value: string): void;
}

const GlobalContext = createContext<GlobalContextData>({} as GlobalContextData)

export const GlobalProvider: React.FC = ({ children }) => {
    const [friendshipId, setFriendshipId] = useState('')

    return (
        <GlobalContext.Provider value={{ friendshipId, setFriendshipId }}>
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobal(): GlobalContextData {
    const context = useContext(GlobalContext)
    if (!context) {
        throw new Error('useGlobal must be used within an GlobalProvider')
    }
    return context;
}