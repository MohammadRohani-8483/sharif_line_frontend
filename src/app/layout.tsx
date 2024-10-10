import '@/src/styles/globals.css';

import type { Metadata } from "next";
import { type ReactNode } from 'react';
import ClientLayout from './client';
import StyledComponentsRegistry from './registry';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalCookies } from "@/src/utils/types/global";
import { cookies, headers } from "next/headers";
import NextTopLoader from "nextjs-toploader";


const baseAppTitle = 'پرس افزار شریف';

export const metadata: Metadata = {
    icons: [{ rel: 'icon', url: '/images/svg/logo.svg' }],
    title: {
        template: `%s - ${baseAppTitle}`,
        default: baseAppTitle
    }
}

export default async function RootLayout(p: { children: ReactNode }) {
    let accessToken: GlobalCookies | null = cookies().get('access') || null
    let refreshToken: GlobalCookies | null = cookies().get('refresh') || null
    const pathname = headers().get('x-next-pathname') as string;
    return <html dir="rtl">
        <body style={{ userSelect: 'none' }}>
            <NextTopLoader color={'var(--Main)'} showSpinner={false} />
            <StyledComponentsRegistry>
                <ClientLayout pathname={pathname} tokens={{ access: accessToken?.value || null, refresh: refreshToken?.value || null }}>
                    <ToastContainer position={'top-center'} {...ToastifyProps} style={{ fontSize: 14 }} />
                    {p.children}
                </ClientLayout>
            </StyledComponentsRegistry>
        </body>
    </html>
}
const ToastifyProps = {
    autoClose: 3000,
    theme: 'light',
    pauseOnHover: false,
    draggable: true,
    limit: 3,
    hideProgressBar: true,
    newestOnTop: true,
    rtl: true,
    pauseOnFocusLoss: true
}