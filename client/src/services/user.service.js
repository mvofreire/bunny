import api from "utils/request";

export const getAllUsers = () => {
  return api.get("/users");
};

export const getUserData = id => {
  return api.get(`/users/${id}`);
};

export const createUser = user => {
  return api.post("/users", user);
};

export const updateUser = ({ id, ...user }) => {
  return api.put(`/users/${id}`, user);
};

export const removeUser = id => {
  return api.delete(`/users/${id}`);
};
