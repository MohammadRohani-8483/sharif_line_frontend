// export function checkFirstValue(payload: object | any[] | string | unknown): string {
//     if (typeof payload === "string")
//         return payload;
//
//     else if (Array.isArray(payload))
//         return checkFirstValue(payload[0]);
//
//     else if (typeof payload === "object") {
//         const keys = Object.keys(payload as any);
//         return checkFirstValue(payload![keys[0]]);
//     }
//
//     return ''; // fix typescript error
// }
import {AxiosError} from "axios";

export const isNumeric = (input: string): boolean => {
    return /^[\u06F0-\u06F90-9]*$/.test(input);
};
export const handleNumberInputKeypress = (e: any) => {
    if (!isNumeric(e.key)) e.preventDefault();
};

export function isAxiosError(error: any): error is AxiosError {
    return error.isAxiosError === true;
}