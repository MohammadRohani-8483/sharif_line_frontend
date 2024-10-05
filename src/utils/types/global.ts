import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import React, { ChangeEvent, SetStateAction } from "react";
import { CSSProperties } from "styled-components";

export type T_Response<T> = {
    count: number
    next: string | null
    previous: string | null
    results: T[]
}
export type isOpen = {
    open: boolean;
    visible: boolean;
}

export type T_ShowTooltip = {
    axis: 'T' | 'B' | null
    visible: boolean
}

export type T_SetState<T> = React.Dispatch<SetStateAction<T>>
export type T_InputEvent = ChangeEvent<HTMLInputElement>
export type GlobalCookies = RequestCookie | undefined

export interface I_SideBarItem {
    title: string,
    icon: string,
    url: string,
}
export type T_OrderingItem = {
    id: string
    name: string
}
export interface PopupProps {
    onClose(): void;
    children: ((close: () => void) => JSX.Element) | JSX.Element;
    /** Clicking outside of the popup window will close it. */ dismisable?: boolean;
    BoxStyle: CSSProperties;
    disableOverflowX?: boolean;
    className?: string;
}

export interface I_SideBarItem {
    title: string,
    icon: string,
    url: string,
}

export interface PopupProps {
    onClose(): void;
    disableOverflowX?: boolean;
    className?: string;
}
export type T_Mode = 'MIXED' | 'ROW'
export type T_ChartMode = T_Mode | 'MESSED'
export type T_ChartData = {
    id: number
    name: string
    options: {
        id: number
        text: string
        title: string
    }[]
    counts: {
        [id: string]: number
    }
    percentages: {
        [id: string]: number
    }
    title: string
}

export type T_ChartResponse = {
    title: string
    group_slug: string
    result: T_ChartData[]
}
