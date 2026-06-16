import { useMutation } from "@tanstack/react-query";
import { demoteFromAssignee } from "../../services/assignableServices";

export const useDemoteAssignee = () => {
  return useMutation({
    mutationFn: (email) => demoteFromAssignee(email),
  });
};
