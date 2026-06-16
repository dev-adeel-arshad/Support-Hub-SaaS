import { useMutation } from "@tanstack/react-query";
import { promoteToAssignee } from "../../services/assignableServices";

export const usePromoteAssignee = () => {
  return useMutation({
    mutationFn: (email) => promoteToAssignee(email),
  });
};
