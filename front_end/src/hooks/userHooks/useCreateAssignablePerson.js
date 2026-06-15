import { useMutation } from "@tanstack/react-query";
import { createAssignablePerson } from "../../services/assignableServices";

export const useCreateAssignablePerson = () => {
  return useMutation({
    mutationFn: createAssignablePerson,
  });
};
