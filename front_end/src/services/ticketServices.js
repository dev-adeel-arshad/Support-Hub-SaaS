
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

// GET ALL TICKETS (ADMIN)
export const getAllTickets = async (filters = {}) => {
    try {

        const result = await axiosInstance.get(
            "/tickets/all",
            {
                params: filters,
            }
        );

        return result.data;

    } catch (error) {

        console.error(
            "Error fetching all tickets:",
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


export const getTicket = async (id) => {
    return await axiosInstance.get(`/tickets/${id}`);
};

export const changeTicketStatus = async ({ id, status }) => {
    return await axiosInstance.patch(`/tickets/${id}/status`, {
        status,
    });
};

export const assignTicket = async ({ id, userId, assignedToEmail }) => {
    return await axiosInstance.patch(`/tickets/${id}/assign`, {
        assignedTo: userId,
        assignedToEmail,
    });
};