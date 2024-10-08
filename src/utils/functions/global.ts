import { isOpen, T_SetState, T_ShowTooltip } from "../types/global";

export const closePopup = (setIsOpen: T_SetState<isOpen>) => {
    setIsOpen(p => ({ ...p, visible: false }));
    setTimeout(() => setIsOpen(p => ({ ...p, open: false })), 300)
}

export const hideTooltip = (setIsShow: T_SetState<T_ShowTooltip>) => {
    setIsShow(p => ({ ...p, visible: false }));
    setTimeout(() => setIsShow(p => ({ ...p, axis: null })), 300)
}

export const convertDate = (date: string | number) => {
    const newDate = new Date(date);
    return newDate.toLocaleString('fa-IR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}

export const addZero = (num: number) => {
    if (num > 9) return `${num}`
    return `0${num}`
}

export const getHour = (date: Date) => {
    const minute = date.getMinutes()
    const hour = date.getHours()
    return `${addZero(hour)}:${addZero(minute)}`
}

export function joinQueryStringParams(params: { [key: string]: string | number | string[] | boolean }): string {
    return Object.entries(params)
        .filter(([_, v]) => v !== null && v !== undefined && v !== '')
        .map(([k, v]) => `${k}=${v}`).join('&');
}

export const formatNumber = (number: number) => {
    return number?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export function shortenString(str: string, maxLength: number) {
    const regex = new RegExp(`^(.{${maxLength}})(.*)$`);
    const match = str.match(regex);

    if (match) {
        return `${match[1]}...`;
    } else {
        return str;
    }
}

export const download = (url: string, filename: string): void => {
    const anchor = document.createElement('a');
    anchor.download = filename;
    anchor.href = url;
    anchor.click();
    anchor.remove();
}