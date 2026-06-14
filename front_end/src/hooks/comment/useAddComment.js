import { useMutation } from "@tanstack/react-query";

import {
    addComment,
} from "../../services/commentServices";

export const useAddComment = () => {

    return useMutation({

        mutationFn: addComment,

    });

};