import { handleError } from "../../server/handleError";
import SERVER from "../../server/server";
import { convertFileToBinary } from "../../utils/convertBinary";
import { setLoading } from "../reducers/authReducer";
import { setFiles, setFolders, setSharedFiles } from "../reducers/fileReducer";

export const getFolders = (dispatch, data) =>
    new Promise((resolve, reject) => {
        // dispatch(setLoading(true));
        SERVER.get(`/folders/${data.user_id}`)
            .then((res) => {
                dispatch(setLoading(false));
                dispatch(setFolders(res.data));
                resolve(res.data);
            })
            .catch((err) => {
                dispatch(setLoading(false));
                reject(handleError(dispatch, err));
            });
    });

export const createFolder = (dispatch, data) =>
    new Promise((resolve, reject) => {
        console.log(
            "token : ",
            SERVER.defaults.headers.common["Authorization"]
        );
        dispatch(setLoading(true));
        SERVER.post(`/folders/create`, data)
            .then((res) => {
                console.log("res : ", res.data);
                dispatch(setLoading(false));
                resolve(res.data);
            })
            .catch((err) => {
                console.log("err : ", err);
                dispatch(setLoading(false));
                reject(handleError(dispatch, err));
            });
    });

export const getFiles = (dispatch, folderId) =>
    new Promise((resolve, reject) => {
        // dispatch(setLoading(true));
        SERVER.get(`/files/${folderId}`)
            .then((res) => {
                dispatch(setLoading(false));
                dispatch(setFiles(res.data));
                resolve(res.data);
            })
            .catch((err) => {
                dispatch(setLoading(false));
                reject(handleError(dispatch, err));
            });
    });

export const getSharedFiles = (dispatch) =>
    new Promise((resolve, reject) => {
        // dispatch(setLoading(true));
        SERVER.post(`/files/shared`)
            .then((res) => {
                dispatch(setLoading(false));
                dispatch(setSharedFiles(res.data));
                resolve(res.data);
            })
            .catch((err) => {
                dispatch(setLoading(false));
                reject(handleError(dispatch, err));
            });
    });

export const uploadFile = (dispatch, data) =>
    new Promise((resolve, reject) => {
        dispatch(setLoading(true));
        const formData = new FormData();
        formData.append("name", data.file.name);
        formData.append("f_gid", data.f_gid);
        formData.append("g_id", "g_id");
        formData.append("recipients", data.recipients);
        formData.append("file_type", data.file.mimeType);
        formData.append("file", {
            uri: data.file.uri,
            type: data.file.mimeType,
            name: data.file.name,
        });

        SERVER.post(`/files/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((res) => {
                dispatch(setLoading(false));
                resolve(res.data);
            })
            .catch((err) => {
                dispatch(setLoading(false));
                reject(handleError(dispatch, err));
            });
    });

export const downloadFile = (dispatch, data) =>
    new Promise((resolve, reject) => {
        dispatch(setLoading(true));

        SERVER.get(`/files/download/${data}`)
            .then((res) => {
                dispatch(setLoading(false));
                resolve(res.data);
            })
            .catch((err) => {
                dispatch(setLoading(false));
                reject(handleError(dispatch, err));
            });
    });

export const clearDownload = (dispatch) =>
    new Promise((resolve, reject) => {
        SERVER.delete(`/downloads/clear`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(handleError(dispatch, err));
            });
    });
