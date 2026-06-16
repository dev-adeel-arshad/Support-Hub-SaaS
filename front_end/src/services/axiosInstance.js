
import axios from 'axios';

const baseURL = import.meta.env.VITE_SERVER_URL ?? 'http://localhost:7000';

export const axiosInstance = axios.create({
    baseURL: `${baseURL}/api/v1`,
    withCredentials: true,
});
