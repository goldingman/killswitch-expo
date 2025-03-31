import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        loadingText: "",
        user: {},
        authed: false,
        token: "",
        email: "",
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setLoadingText: (state, action) => {
            state.loadingText = action.payload;
        },
        setAuth: (state, action) => {
            state.authed = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setLogOut: (state, action) => {
            state.authed = false;
            state.token = "";
            state.user = {};
        },
    },
});

export const {
    setAuth,
    setEmail,
    setLoading,
    setLoadingText,
    setLogOut,
    setToken,
    setUser,
} = authSlice.actions;

export default authSlice.reducer;
