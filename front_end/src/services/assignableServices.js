import { axiosInstance } from "./axiosInstance";

export const getAssignees = async () => {
  const result = await axiosInstance.get("/user/admin/users?role=assignee");
  return result.data;
};

export const getCurrentUserProfile = async () => {
  const result = await axiosInstance.get("/user/current-user");
  return result.data;
};

export const updateUserRole = async (id, role) => {
  const result = await axiosInstance.patch(`/user/admin/users/${id}/role`, { role });
  return result.data;
};

export const promoteToAssignee = async (email) => {
  const result = await axiosInstance.post("/user/admin/assignees/promote", { email });
  return result.data;
};

export const demoteFromAssignee = async (email) => {
  const result = await axiosInstance.post("/user/admin/assignees/demote", { email });
  return result.data;
};
