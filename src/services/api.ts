import axios from "axios";


// 백엔드 API 기본 URL
const API_BASE_URL = "http://localhost:8080/todoList/api/tasks";

export const fetchTasks = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const createTask = async (task: { title: string; completed: boolean }) => {
  const response = await axios.post(API_BASE_URL, task);
  return response.data;
};

export const updateTask = async (id: number, task: { title: string; completed: boolean }) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: number) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};
