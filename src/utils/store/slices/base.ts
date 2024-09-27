import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Schema from "Schema";


export type Profile = Schema.Profile | null;
export type Tokens = { access: string | null, refresh: string | null }

const baseSlice = createSlice({
    name: 'base',
    initialState: {
        isAuthenticated: false as boolean,
        user: null as Profile,
        token: { access: null, refresh: null } as Tokens 
    },
    reducers: {
        setProfile: (state, action: PayloadAction<{ user: Schema.Profile }>) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
        setToken: (state, action: PayloadAction<Tokens>) => {
            state.token = action.payload
        }
    }
})

export const { actions } = baseSlice;
export const { setProfile, logout, setToken } = actions;
export default baseSlice.reducer;