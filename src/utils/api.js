import axios from "axios";

// Configure the base URL for the API based on the environment variable
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
