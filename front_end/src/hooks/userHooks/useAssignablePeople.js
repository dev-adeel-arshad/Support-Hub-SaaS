import { useQuery } from "@tanstack/react-query";
import { getAssignablePeople } from "../../services/assignableServices";

export const useAssignablePeople = (options = {}) => {
  return useQuery({
    queryKey: ["assignable-people"],
    queryFn: getAssignablePeople,
    ...options,
  });
};
