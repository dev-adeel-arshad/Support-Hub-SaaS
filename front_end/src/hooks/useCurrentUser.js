import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/authService";

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ["current-user"],
        queryFn: getCurrentUser,
    });
};