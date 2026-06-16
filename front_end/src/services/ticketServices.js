
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
        throw error;
    }
};


export const getTicket = async (id) => {
    const result = await axiosInstance.get(`/tickets/${id}`);
    return result.data;
};

export const changeTicketStatus = async ({ id, status }) => {
    const result = await axiosInstance.patch(`/tickets/${id}/status`, {
        status,
    });
    return result.data;
};

export const assignTicket = async ({ id, userId, assignedToEmail }) => {
    const result = await axiosInstance.patch(`/tickets/${id}/assign`, {
        assignedTo: userId,
        assignedToEmail,
    });
    return result.data;
};

export const getAssignedTickets = async () => {
    const result = await axiosInstance.get("/tickets/assigned");
    return result.data;
};