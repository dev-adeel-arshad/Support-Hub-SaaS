import { useQuery } from "@tanstack/react-query";

import { getAllUsers } from "../../services/userServices";

export const useAllUsers = (options = {}) => {
    return useQuery({
        queryKey: ["all-users"],
        queryFn: getAllUsers,
        ...options,
    });
};