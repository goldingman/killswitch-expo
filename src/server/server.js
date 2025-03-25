import axios from "axios";

const SERVER = axios.create({
    // baseURL: "http://192.168.132.98:8000/",
    baseURL: "http://localhost:8000/",
    // timeout: 5000,
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
    },
});

export default SERVER;
