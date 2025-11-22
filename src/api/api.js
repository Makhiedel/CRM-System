const api = "https://easydev.club/api/v1/todos";

export async function fetchTasks(filter) {//recieving data from back
  console.log('fetching');
  try {
    const response = await fetch(api + `?filter=${filter}`);
    if (!response.ok) {
      throw new Error(`response status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function apiCreateTask(taskTitle) {//adding task
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
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
}

export async function apiDeleteTask(id) {

  try {
    const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete");
    }
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
}

export async function apiChangeTodo(taskInfo) {
  try {
    const response = await fetch(`https://easydev.club/api/v1/todos/${taskInfo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskInfo),
      })
    if (!response.ok) {
      throw new Error("Failed to change status");
    }
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
}