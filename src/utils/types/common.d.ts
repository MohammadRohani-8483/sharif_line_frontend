declare module 'common-interfaces' {
    export interface I_SideBarItem {
        title: string,
        icon: string,
        url: string,
    }

    export interface PopupProps {
        onClose(): void;
        children: ((close: () => void) => JSX.Element) | JSX.Element;
        /** Clicking outside of the popup window will close it. */ dismisable?: boolean;
        /** Controls when `Esc` key is pressed.
         * @defaultValue
         * the popup window will be closed when dismissible prop is set to `true`
         */
        EscEvent?: ((defaultFunc: DefaultEscEvent) => void) | boolean;
        disableOverflowX?: boolean;
        className?: string;
    }

    export type T_OrderingItem = {
        id: string
        name: string
    }

    export type T_Mode = 'MIXED' | 'ROW'
}
declare module 'common-types' {
    import { T_Mode } from 'common-interfaces'
    import React, { SetStateAction } from "react";
    export type T_SetState<T> = React.Dispatch<SetStateAction<T>>
    export type T_Response<T> = {
        count: number
        next: string | null
        previous: string | null
        results: T[]
    }
    export type T_ChartMode = T_Mode | 'MESSED'

    export type T_ChartData = {
        id: number
        name: string
        options: {
            id: number
            title: string
        }[]
        counts: {
            [id: string]: number
        }
        percentages: {
            [id: string]: number
        }
    }
}