import { axiosInstance } from "./axiosInstance.js";

const registerUser = async (data) => {
    try {
        const result = await axiosInstance.post(
            "/user/register-user", data );

        return result.data;
    } catch (error) {
          console.log("Status:", error.response?.status);
    console.log("Response:", error.response?.data);
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
           console.log("Status:", error.response?.status);
    console.log("Response:", error.response?.data);

        throw error;
    }
};

export { registerUser, loginUser };