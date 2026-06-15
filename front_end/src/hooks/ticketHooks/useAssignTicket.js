import { useMutation } from "@tanstack/react-query";
import { assignTicket } from "../../services/ticketServices";

export const useAssignTicket = () => {
    return useMutation({
        mutationFn: assignTicket,
    });
};