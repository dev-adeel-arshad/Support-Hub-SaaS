
import { axiosInstance } from "./axiosInstance";

// CREATE TICKET
export const createTicket = async (formData) => {
    try {

        const result = await axiosInstance.post(
            "/tickets/create-ticket",
            formData
        );

        return result.data;

    } catch (error) {

        console.error(
            "Error creating ticket:",
            error
        );

        throw error;
    }
};

// GET USER TICKETS
export const getMyTickets = async () => {
    try {

        const result = await axiosInstance.get(
            "/tickets/my-tickets"
        );

        return result.data;

    } catch (error) {

        console.error(
            "Error fetching tickets:",
            error
        );

        throw error;
    }
};

// GET SINGLE TICKET
export const getTicketById = async (id) => {
    try {

        const result = await axiosInstance.get(
            `/tickets/${id}`
        );

        return result.data;

    } catch (error) {

        console.error(
            "Error fetching ticket:",
            error
        );

        throw error;
    }
};