import { axiosInstance } from "./axiosInstance";

const getDashboardStats = async () => {

    const result = await axiosInstance.get(
        "/admin/dashboard"
    );

    return result.data;
};

export {
    getDashboardStats,
};