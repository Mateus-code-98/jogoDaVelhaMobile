import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserProps {
    id: string;
    name: string;
    email: string;
    photoUrl: string;
}

interface DataProps {
    token: string;
    user: UserProps;
}

export interface credentialsProps {
    email: string;
    name: string;
    photoUrl: string;
}

interface AuthContextData {
    user: UserProps;
    loading: boolean;
    signIn(credentials: credentialsProps): Promise<void>;
    signOut(): void;
    updateUser(value: UserProps): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<DataProps>({} as DataProps)
    const [loading, setLoading] = useState<boolean>(true)

    const storageInitial = async () => {
        const [token, user] = await AsyncStorage.multiGet([
            '@JDV:token',
            '@JDV:user'
        ])
        if (token[1] && user[1]) setData({ token: token[1], user: JSON.parse(user[1]) })
        else setData({} as DataProps)
        setLoading(false)
    }

    useEffect(() => {
        storageInitial()
    }, [])

    const signIn = useCallback(async (data) => {
        const res = await api.post('/login', data)
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

    const updateUser = useCallback(async (newUser) => {
        const token = data.token
        setData({ token, user: newUser })
        await AsyncStorage.multiSet([
            ['@JDV:token', token],
            ['@JDV:user', JSON.stringify(newUser)]
        ])
    }, [data])

    return (
        <AuthContext.Provider value={{ loading, signIn, signOut, user: data.user, updateUser }}>
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