'use client'

import { type ReactNode, useRef } from 'react';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { useServerInsertedHTML } from 'next/navigation';

export default function StyledComponentsRegistry(p: { children: ReactNode }) {
    const { current: styleSheet } = useRef(new ServerStyleSheet());
    useServerInsertedHTML(() => {
        const styles = styleSheet.getStyleElement();
        styleSheet.instance.clearTag();
        return <>{styles}</>;
    })
    if (typeof window !== 'undefined') return <>{p.children}</>;

    return (
        <StyleSheetManager sheet={styleSheet.instance}>
            {p.children}
        </StyleSheetManager>
    )
}