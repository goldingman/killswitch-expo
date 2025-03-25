import { handleError } from "../../server/handleError";
import SERVER from "../../server/server";
import { convertFileToBinary } from "../../utils/convertBinary";
import { setLoading } from "../reducers/authReducer";
import { setFolders } from "../reducers/fileReducer";

export const getFolders = (dispatch) =>
    new Promise((resolve, reject) => {
        dispatch(setLoading(true));
        SERVER.get("service/folder/list")
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
        dispatch(setLoading(true));
        SERVER.get(`service/folder/create?folder_name=${data}`)
            .then((res) => {
                dispatch(setLoading(false));
                resolve(res.data);
            })
            .catch((err) => {
                dispatch(setLoading(false));
                reject(handleError(dispatch, err));
            });
    });

export const getFiles = (dispatch, folderId) =>
    new Promise((resolve, reject) => {
        dispatch(setLoading(true));
        SERVER.get(`service/files/list?folder_id=${folderId}`)
            .then((res) => {
                dispatch(setLoading(false));
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
        formData.append("folder_id", data.folderId);
        formData.append("recipients", data.recipients);
        formData.append("file", {
            uri: data.file.uri,
            type: data.file.mimeType,
            name: data.file.name,
        });

        SERVER.post(`service/files/upload`, formData, {
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

        SERVER.get(`service/files/download/${data}`)
            .then((res) => {
                console.log("res : ", res);
                dispatch(setLoading(false));
                resolve(res.data);
            })
            .catch((err) => {
                dispatch(setLoading(false));
                reject(handleError(dispatch, err));
            });
    });
