import { useMutation } from "@tanstack/react-query";
import { changeTicketStatus } from "../../services/ticketServices";

export const useChangeStatus = () => {
    return useMutation({
        mutationFn: changeTicketStatus,
    });
};