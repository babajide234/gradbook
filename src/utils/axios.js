import axios from "axios";
import { BASE_URL } from "./constants";

export const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Accept':'application/json',
        'Content-Type':'application/json',
    }
});

instance.interceptors.request.use(function (config) {
    // Perform check before request is sent
    
    return config;
}, function (error) {
    return Promise.reject(error)
})