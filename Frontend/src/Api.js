import axios from "axios";
const BackendUrl = import.meta.env.VITE_BACKEND_URL;

export const getAllTask = async () => {
  const res = await axios.get(`${BackendUrl}/api/getAllTasks`);
  return res.data;
};

export const postTask = async (values) => {
  return await axios.post(`${BackendUrl}/api/addTask`, values);
};

export const editTaskApi = async (values) => {
  return await axios.put(`${BackendUrl}/api/editTask`, values);
};

export const deleteTask = async (id) => {
  return await axios.delete(`${BackendUrl}/api/deleteTask/${id}`);
};
