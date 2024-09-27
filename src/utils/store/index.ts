import { configureStore } from "@reduxjs/toolkit";

import baseReducer from './slices/base';
import { TypedUseSelectorHook, useSelector as useAppSelector } from "react-redux";

const store = configureStore({
    reducer: {
        base: baseReducer
    },
})

export type AppStore = typeof store;
export type AppState = ReturnType<AppStore['getState']>;
export const useSelector: TypedUseSelectorHook<AppState> = useAppSelector;

export default store;