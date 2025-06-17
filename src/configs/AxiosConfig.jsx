import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL ;

const axiosClient = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

// Add a request interceptor
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data && config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
});

export default axiosClient;