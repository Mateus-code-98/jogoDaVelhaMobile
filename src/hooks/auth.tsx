import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserProps {
    id: string;
    name: string;
}

interface DataProps {
    token: string;
    user: UserProps;
}

interface credentialsProps {
    email: string;
    password: string;
}

interface AuthContextData {
    user: UserProps;
    signIn(credentials: credentialsProps): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<DataProps>({} as DataProps)

    const storageInitial = async () => {
        const [token, user] = await AsyncStorage.multiGet([
            '@JDV:token',
            '@JDV:user'
        ])
        if (token[1] && user[1]) setData({ token: token[1], user: JSON.parse(user[1]) })
        else setData({} as DataProps)
    }

    useEffect(() => {
        storageInitial()
    }, [])

    const signIn = useCallback(async ({ email, password }) => {
        console.log({ email, password })
        const res = await api.post('/login', { email, password })
        console.log(res.data)
        const { token, user } = res.data
        await AsyncStorage.multiSet([
            ['@JDV:token', token],
            ['@JDV:user', JSON.stringify(user)]
        ])
        setData({ token, user })
    }, [])

    const signOut = useCallback(async () => {
        await AsyncStorage.multiRemove(['@JDV:token', '@JDV:user'])
        setData({} as DataProps)
    }, [])

    return (
        <AuthContext.Provider value={{ signIn, signOut, user: data.user }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context;
}