import { createSlice } from "@reduxjs/toolkit";

export const fileSlice = createSlice({
    name: "file",
    initialState: {
        file: null,
        name: "",
        type: "",
        path: "",
        folders: [],
        files: [],
        sharedFiles: [],
    },
    reducers: {
        setFile: (state, action) => {
            state.file = action.payload.file;
            state.name = action.payload.name;
            state.type = action.payload.type;
            state.path = action.payload.path;
        },
        clearFile: (state) => {
            state.file = null;
            state.name = "";
            state.type = "";
            state.path = "";
        },
        setFolders: (state, action) => {
            state.folders = action.payload;
        },
        setFiles: (state, action) => {
            state.files = action.payload;
        },
        setSharedFiles: (state, action) => {
            state.sharedFiles = action.payload;
        },
    },
});

export const { setFile, clearFile, setFolders, setFiles, setSharedFiles } =
    fileSlice.actions;

export default fileSlice.reducer;
