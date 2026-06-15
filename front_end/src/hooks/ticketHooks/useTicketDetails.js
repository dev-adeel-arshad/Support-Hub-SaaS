import { useQuery } from "@tanstack/react-query";
import { getTicket } from "../../services/ticketServices";

export const useTicketDetails = (id) => {
    return useQuery({
        queryKey: ["ticket-details", id],
        queryFn: () => getTicket(id),
        enabled: !!id,
    });
};