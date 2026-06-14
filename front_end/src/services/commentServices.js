import { axiosInstance } from "./axiosInstance";

// GET COMMENTS

export const getComments = async (ticketId) => {
    try {

        const result = await axiosInstance.get(
            `/comments/${ticketId}`
        );

        return result.data;

    } catch (error) {

        console.error(
            "Error fetching comments:",
            error
        );

        throw error;
    }
};

// ADD COMMENT

export const addComment = async ({
    ticketId,
    message,
}) => {
    try {

        const result = await axiosInstance.post(
            `/comments/${ticketId}`,
            {
                message,
            }
        );

        return result.data;

    } catch (error) {

        console.error(
            "Error adding comment:",
            error
        );

        throw error;
    }
};