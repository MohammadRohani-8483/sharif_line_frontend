'use client'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { createContext, ReactNode, useState } from 'react'
import { T_SetState } from '../types/global'

export type Me = {}

type Context = {
    me: Me | null
    setMe: T_SetState<Me | null>
    cookies: Cookie | null
    setCookies: T_SetState<Cookie | null>
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