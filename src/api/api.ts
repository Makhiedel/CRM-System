const api = "https://easydev.club/api/v1/todos";

import type {Todo, QueryFilter, RawTodo, UserInputTask} from "../types/Todos.js";
export async function fetchTasks(filter:QueryFilter) {//recieving data from back
  console.log('fetching');
  try {
    const response = await fetch(api + `?filter=${filter}`);
    if (!response.ok) {
      throw new Error(`response status ${response.status}`);
    }
    const data:RawTodo = await response.json();
    return data;
  } catch (error:any) {
    throw new Error(error.message);
  }
}

export async function apiCreateTask(taskTitle:String) {//adding task
  try {
    const response = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskTitle),
    });
    if (!response.ok) {
      throw new Error("Failed to add");
    }
  } catch (error:any) {
    console.log(error.message);
    throw new Error(error.message);
  }
}

export async function apiDeleteTask(id:Number) {

  try {
    const response = await fetch((api+"/"+id), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete");
    }
  } catch (error:any) {
    console.log(error.message);
    throw new Error(error.message);
  }
}

export async function apiChangeTodo(taskInfo:UserInputTask) {
  try {
    const response = await fetch((api + "/" + taskInfo.id), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskInfo),
      })
    if (!response.ok) {
      throw new Error("Failed to change status");
    }
  } catch (error:any) {
    console.log(error.message);
    throw new Error(error.message);
  }
}