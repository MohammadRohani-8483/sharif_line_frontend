import axios from "axios";
import { AxiosError, AxiosResponse } from "axios";
import store from "../store";
import { Tokens } from "../store/slices/base";

const isServer = typeof window === 'undefined'

axios.defaults.baseURL = isServer ? `http://${process.env.BASE_URL}/` : '/api/';
export const axiosInstance = (token?: Tokens) => {
    let reduxToken = store.getState().base.token;
    const origToken = { access: process.env.NEXT_PUBLIC_TOKEN || token?.access || reduxToken.access, refresh: token?.refresh || reduxToken.refresh }
    const instance = axios.create({
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (origToken.access) instance.defaults.headers['Authorization'] = `JWT ${origToken.access}`

    instance.interceptors.response.use(function (response: AxiosResponse) {
        return response;
    }, async function (error: AxiosError) {
        if (!error.response || isServer)
            return Promise.reject(error);
        switch (error.response.status) {
            case 401:
                if (origToken.refresh) {
                    axios.post('core/auth/refresh/', { refresh: origToken.refresh }, {
                        withCredentials: true
                    })
                        .then(() => {
                            instance.request(error.config!);
                        })
                        .catch(() => Promise.reject(error.response))
                }
                return Promise.reject(error.response);
        }
        return Promise.reject(error);
    });
    return instance
}




