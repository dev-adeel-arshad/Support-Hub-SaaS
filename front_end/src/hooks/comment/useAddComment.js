import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addComment } from "../../services/commentServices";

export const useAddComment = (ticketId) => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addComment,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["comments", ticketId],
            });
        },

        onError: (error) => {
            console.error("Comment failed:", error);
        },
    });
};