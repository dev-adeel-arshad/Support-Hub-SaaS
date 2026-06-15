import { useMutation } from "@tanstack/react-query";
import { deleteAssignablePerson } from "../../services/assignableServices";

export const useDeleteAssignablePerson = () => {
  return useMutation({
    mutationFn: deleteAssignablePerson,
  });
};
