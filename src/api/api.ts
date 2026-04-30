const api = "https://easydev.club/api/v1/todos";

import type {
  Todo,
  QueryFilter,
  Todos,
  UserInputTask,
} from "../types/Todos.js";

function errorHelper(error: unknown): string {
  if (error instanceof Error) {
    throw new Error(error.message);
  } else if (error === 'string'){
    throw new Error(error);
  } else {
    throw new Error('Unknown error');
  }
}

export async function fetchTasks(filter: QueryFilter): Promise<Todos> {
  //recieving data from back
  console.log("fetching");
  try {
    const response = await fetch(api + `?filter=${filter}`);
    if (!response.ok) {
      throw new Error(`response status ${response.status}`);
    }
    const data: Todos = await response.json();
    return data;
  } catch (error: unknown) {
    errorHelper(error);
    throw error;
  }
}

export async function apiCreateTask(
  taskInfo: UserInputTask,
): Promise<Response> {
  //adding task
  try {
    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskInfo),
    });
    if (!response.ok) {
      throw new Error("Failed to add");
    }
    return response;
  } catch (error: unknown) {
    errorHelper(error);
    throw error;
  }
}

export async function apiDeleteTask(id: number): Promise<Response> {
  try {
    const response = await fetch(api + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete");
    }
    return response;
  } catch (error: unknown) {
    errorHelper(error);
    throw error;
  }
}

export async function apiChangeTodo(
  taskInfo: UserInputTask,
): Promise<Response> {
  try {
    const response = await fetch(api + "/" + taskInfo.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskInfo),
    });
    if (!response.ok) {
      throw new Error("Failed to change status");
    } else if (!taskInfo.id) {
      throw new Error("Failed to change: no id");
    }
    return response;
  } catch (error: unknown) {
    errorHelper(error);
    throw error;
  }
}
