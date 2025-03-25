import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./authReducer";
import { fileSlice } from "./fileReducer";

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    file: fileSlice.reducer,
    // Add more slices as needed
});

export default rootReducer;
