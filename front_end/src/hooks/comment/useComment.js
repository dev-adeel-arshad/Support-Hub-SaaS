import { useQuery } from "@tanstack/react-query";

import {
    getComments,
} from "../../services/commentServices";

export const useComments = (ticketId) => {

    return useQuery({

        queryKey: [
            "comments",
            ticketId,
        ],

        queryFn: () =>
            getComments(ticketId),

        enabled: !!ticketId,

    });

};
