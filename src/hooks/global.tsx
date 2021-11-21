import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

interface GlobalContextData {
    menuOpen: boolean;
    loading: boolean;
    paginaAtual: string;
    openSelect: string;
    dateNow: Date;
    setOpenSelect(value: string): void;
    setPaginaAtual(value: string): void;
    setLoading(value: boolean): void;
    setMenuOpen(value: boolean): void;
}

const GlobalContext = createContext<GlobalContextData>({} as GlobalContextData)

const debounceEvent = () => {
    let timer: any = null
    return (fn: any, wait: any) => {
        clearTimeout(timer)
        timer = setTimeout(() => fn(), wait)
    }
}

const debounce = debounceEvent()

export const GlobalProvider: React.FC = ({ children }) => {
    const [menuOpen, setMenuOpen] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(false)
    const [paginaAtual, setPaginaAtual] = useState<string>('dashboard')
    const [openSelect, setOpenSelect] = useState<string>('-1')
    const [dateNow, setDateNow] = useState<Date>(new Date())

    const DateNow = useCallback(() => setDateNow(new Date()), [])

    useEffect(() => { setInterval(DateNow, 1000) }, [])

    return (
        <GlobalContext.Provider value={{ dateNow, openSelect, setOpenSelect, menuOpen, setMenuOpen, loading, setLoading, paginaAtual, setPaginaAtual }}>
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