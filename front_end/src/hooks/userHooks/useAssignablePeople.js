import { useQuery } from "@tanstack/react-query";
import { getAssignees } from "../../services/assignableServices";

export const useAssignees = (options = {}) => {
  return useQuery({
    queryKey: ["assignees"],
    queryFn: getAssignees,
    ...options,
  });
};
