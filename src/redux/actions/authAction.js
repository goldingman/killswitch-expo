import { handleError } from "../../server/handleError";
import SERVER from "../../server/server";
import { setAuth, setLoading, setToken } from "../reducers/authReducer";

export const login = (dispatch, data) =>
    new Promise((resolve, reject) => {
        setLoading(true);
        SERVER.post("/token", data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
            .then((res) => {
                dispatch(setLoading(false));
                dispatch(setToken(res.data.access_token));
                dispatch(setAuth(true));
                SERVER.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${res.data.access_token}`;
                resolve(res.data);
            })
            .catch((err) => {
                console.log("err : ", err);
                dispatch(setLoading(false));
                reject(handleError(dispatch, err));
            });
    });

export const signup = (dispatch, data) =>
    new Promise((resolve, reject) => {
        dispatch(setLoading(true));
        SERVER.post("/register", data)
            .then((res) => {
                dispatch(setUser(res.data));
                dispatch(setLoading(false));
                resolve(res.data);
            })
            .catch((err) => {
                dispatch(setLoading(false));
                reject(handleError(dispatch, err));
            });
    });
