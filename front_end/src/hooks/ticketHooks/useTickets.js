import { useQuery } from "@tanstack/react-query";

import {
    getMyTickets,
} from "../../services/ticketServices";

export const useTickets = () => {

    return useQuery({

        queryKey: ["tickets"],

        queryFn: getMyTickets,

    });

};