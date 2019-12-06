import api from "utils/request";

export const getAllTasks = user => {
  return api.get(`/tasks/${user}`);
};
export const createTask = (user, task) => {
  return api.post(`/tasks/${user}`, task);
};
export const updateTask = ({ id, ...task }) => {
  return api.put(`/tasks/${id}`, task);
};
export const checkTaskDone = id => {
  return api.patch(`/tasks/${id}`);
};
export const removeTask = id => {
  return api.delete(`/tasks/${id}`);
};
