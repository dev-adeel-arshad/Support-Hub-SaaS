import { useQuery } from "@tanstack/react-query";

import {
    getTicketById,
} from "../../services/ticketServices";

export const useTicket = (id) => {

    return useQuery({

        queryKey: ["ticket", id],

        queryFn: () => getTicketById(id),

        enabled: !!id,

    });

};