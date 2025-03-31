import { setLogOut } from "../redux/reducers/authReducer";

export const handleError = (dispatch, error) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log("error status code : ", error.response);
        // console.log(error.response.headers);
        if (error.response.status === 401) {
            // dispatch(setLogOut());
            return "Unauthorized.";
        }
        if (error.response.data) {
            return error.response.data;
        } else {
            return "Something went wrong, Please try again!";
        }
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log("Error request: ", error.request);
        return "Our server is not responding now.";
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error message: ", error.message);
        return error.message;
    }
};
