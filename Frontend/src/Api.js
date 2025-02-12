import axios from "axios";
const BackendUrl = import.meta.env.VITE_BACKEND_URL;

export const getAllTask = async () => {
  const result = await axios.get(`${BackendUrl}/api/getAllTasks`);
  return result;
};

export const postTask  = async (values) => {
  console.log(values, "the values in add");
  const result = await axios.post(`${BackendUrl}/api/addTask`, values);
  return result;
};
