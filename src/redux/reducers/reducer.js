import * as types from "../types";

import { initState } from "./initState";

export default function (state = initState, action) {
    switch (action.type) {
        case types.SET_LOADING:
            return { ...state, loading: action.payload };
        case types.SET_LOADING_TEXT:
            return { ...state, loadingText: action.payload };
        case types.SET_AUTH:
            return { ...state, authed: true };
        case types.SET_USER:
            return { ...state, user: action.payload };
        case types.SET_TOKEN:
            return { ...state, token: action.payload };
        case types.SET_EMAIL:
            return { ...state, email: action.payload };
        case types.SET_LOG_OUT:
            return { ...state, authed: false, token: "", user: {} };
        default:
            return state;
    }
}
