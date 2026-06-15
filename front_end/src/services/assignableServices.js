import { axiosInstance } from "./axiosInstance";

export const getAssignablePeople = async () => {
  const result = await axiosInstance.get("/assignable");
  return result.data;
};

export const createAssignablePerson = async (data) => {
  const result = await axiosInstance.post("/assignable", data);
  return result.data;
};

export const deleteAssignablePerson = async (id) => {
  const result = await axiosInstance.delete(`/assignable/${id}`);
  return result.data;
};
