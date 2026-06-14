import { useMutation } from "@tanstack/react-query";

import { createTicket } from "../../services/ticketServices";

export const useCreateTicket = () => {

    return useMutation({

        mutationFn: createTicket,

    });

};