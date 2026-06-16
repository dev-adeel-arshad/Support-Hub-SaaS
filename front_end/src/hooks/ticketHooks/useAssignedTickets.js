import { useQuery } from "@tanstack/react-query";
import { getAssignedTickets } from "../../services/ticketServices";

export const useAssignedTickets = () => {
    return useQuery({
        queryKey: ["assigned-tickets"],
        queryFn: getAssignedTickets,
    });
};
