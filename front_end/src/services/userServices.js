import { axiosInstance } from "./axiosInstance";

const getDashboardStats = async () => {

    const result = await axiosInstance.get(
        "/user/admin/dashboard"
    );

    return result.data;
};

const getAllUsers = async () => {
    const result = await axiosInstance.get("/user/admin/users");
    return result.data;
};

export {
    getDashboardStats,
    getAllUsers,
};