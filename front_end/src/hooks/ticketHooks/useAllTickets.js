import { useQuery } from "@tanstack/react-query";

import { getAllTickets } from "../../services/ticketServices";

export const useAllTickets = (filters = {}) => {
    return useQuery({
        queryKey: ["all-tickets", filters],
        queryFn: () => getAllTickets(filters),
    });
};