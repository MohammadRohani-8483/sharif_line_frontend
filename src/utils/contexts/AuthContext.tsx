'use client'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'

export type Me = {}

type Context = {
    me: Me | null
    setMe: Dispatch<SetStateAction<Me | null>>
    cookies: Cookie | null
    setCookies: Dispatch<SetStateAction<Cookie | null>>
}

export type Cookie = {
    access: RequestCookie | null
    refresh: RequestCookie | null
}

const initialContext: Context = {
    me: null,
    setMe: () => { },
    setCookies: () => { },
    cookies: null
}

export const Auth = createContext<Context>(initialContext)

const AuthContext = ({ children, propCookies }: { children: ReactNode, propCookies: Cookie | null }) => {
    const [me, setMe] = useState<Me | null>(null)
    const [cookies, setCookies] = useState<Cookie | null>(propCookies)

    return (
        <Auth.Provider value={{ cookies, setCookies, me, setMe }}>{children}</Auth.Provider>
    )
}

export default AuthContext