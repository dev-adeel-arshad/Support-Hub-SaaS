import { useQuery } from "@tanstack/react-query";
import { getCurrentUserProfile } from "../../services/assignableServices";

export const useCurrentUserProfile = (options = {}) => {
    return useQuery({
        queryKey: ["current-user-profile"],
        queryFn: getCurrentUserProfile,
        ...options,
    });
};
