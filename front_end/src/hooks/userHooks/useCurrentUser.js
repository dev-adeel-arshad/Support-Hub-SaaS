import { useQuery } from "@tanstack/react-query";
import { currentUser } from "../../services/authService";

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ["current-user"],
        queryFn: currentUser,
    });
};