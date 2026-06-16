import { useMutation } from "@tanstack/react-query";
import { updateUserRole } from "../../services/assignableServices";

export const useUpdateUserRole = () => {
  return useMutation({
    mutationFn: ({ id, role }) => updateUserRole(id, role),
  });
};
