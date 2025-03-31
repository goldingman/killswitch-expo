import { handleError } from "../../server/handleError";
import SERVER from "../../server/server";
import {
    setAuth,
    setLoading,
    setToken,
    setUser,
} from "../reducers/authReducer";

export const login = (dispatch, data) =>
    new Promise((resolve, reject) => {
        dispatch(setLoading(true));
        SERVER.post("/token", data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
            .then((res) => {
                console.log("res : ", res.data);
                dispatch(setLoading(false));
                SERVER.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${res.data.access_token}`;
                dispatch(setToken(res.data.access_token));
                dispatch(setAuth(true));
                dispatch(setUser(res.data.data));

                resolve(res.data);
            })
            .catch((err) => {
                dispatch(setLoading(false));
                reject(handleError(dispatch, err));
            });
    });

export const signup = (dispatch, data) =>
    new Promise((resolve, reject) => {
        dispatch(setLoading(true));
        SERVER.post("/register", data)
            .then((res) => {
                dispatch(setLoading(false));
                if (res.data.success) {
                    SERVER.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${res.data.token}`;
                    dispatch(setUser(res.data.data));
                    dispatch(setToken(res.data.token));
                    dispatch(setAuth(true));
                }
                resolve(res.data);
            })
            .catch((err) => {
                dispatch(setLoading(false));
                reject(handleError(dispatch, err));
            });
    });

export const getUsers = (dispatch) =>
    new Promise((resolve, reject) => {
        dispatch(setLoading(true));
        SERVER.get("/users")
            .then((res) => {
                dispatch(setLoading(false));
                resolve(res.data);
            })
            .catch((err) => {
                dispatch(setLoading(false));
                reject(handleError(dispatch, err));
            });
    });
