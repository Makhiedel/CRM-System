import axios from "axios";
import type { QueryFilter, Todos, TaskData } from "../types/Todos.js";

const api = axios.create({
  baseURL: "http://159.194.224.99:8082/api/v1/",
});

export async function fetchTasks(filter: QueryFilter): Promise<Todos> {
  try {
    const response = await api.get<Todos>("/tasks" + `?filter=${filter}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("HTTP error", error.response?.status, error.message);
    } else {
      console.log(`Failed to create task! ${error}`);
    }
  }
}
export async function createTask(taskInfo: TaskData): Promise<void> {
  try {
    const response = await api.post("/tasks", taskInfo);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("HTTP error", error.response?.status, error.message);
    } else {
      console.log(`Failed to create task! ${error}`);
    }
  }
}

export async function deleteTask(id: number): Promise<void> {
  try {
    await api.delete("/tasks/" + id);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("HTTP error", error.response?.status, error.message);
    } else {
      console.log(`Failed to create task! ${error}`);
    }
  }
}

export async function changeTask(taskInfo: TaskData): Promise<void> {
  try {
    const response = api.put("/tasks/" + taskInfo.id, taskInfo);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("HTTP error", error.response?.status, error.message);
    } else {
      console.log(`Failed to create task! ${error}`);
    }
  }
}

