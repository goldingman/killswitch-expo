import axios from "axios";

export const BASE_URL = "https://goliathsecure.com";
// export const BASE_URL = "http://127.0.0.1:8000";

const SERVER = axios.create({
    baseURL: BASE_URL,
    // timeout: 5000,
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
    },
});

export default SERVER;
