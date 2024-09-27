import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

export const errorHandler = (error: AxiosResponse | undefined) => {
    if(!error)
        return
    if (error.status === 500) return toast.error('مشکلی پیش آمده')
    
    const errorData = error.data
    function getErrorText(obj: any): string[] {
        const finalResult: string[] = [];
        for (const key in obj) {
            if (typeof obj[key] === "object") {
                let nestedResult = getErrorText(obj[key]);
                if (Array.isArray(nestedResult)) {
                    finalResult.push(...nestedResult);
                } else {
                    finalResult.push(nestedResult);
                }
            } else {
                finalResult.push(obj[key]);
            }
        }
        return finalResult;
    }
    toast.error(getErrorText(errorData)[0])
}