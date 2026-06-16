import { axiosInstance } from "./axiosInstance.js";

const registerUser = async (data) => {
    try {
        const result = await axiosInstance.post(
            "/user/register-user", data );

        return result.data;
    } catch (error) {
        throw error;
    }
};

const loginUser = async (data) => {
    try {
        const result = await axiosInstance.post(
            "/user/login",data
        );

        return result.data;
    } catch (error) {
        throw error;
    }
};

const currentUser = async () => {
    try {
        const result = await axiosInstance.get("/user/current-user");
        return result.data;
    }
    catch (error) {
        throw error;
    }   
};
export { registerUser, loginUser, currentUser  };    