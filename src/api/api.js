

export async function allTasksFetch() {//recieving data from back
  try {
    const response = await fetch("https://easydev.club/api/v1/todos");
    if (!response.ok) {
      throw new Error(`response status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function inWorkTasksFetch() {//recieving data from back
  try {
    const response = await fetch("https://easydev.club/api/v1/todos?filter=inWork");
    if (!response.ok) {
      throw new Error(`response status ${response.status}`);
    }
    const data = await response.json();
    //console.log(helperArray);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function doneTasksFetch() {//recieving data from back
  try {
    const response = await fetch("https://easydev.club/api/v1/todos?filter=completed");
    if (!response.ok) {
      throw new Error(`response status ${response.status}`);
    }
    const data = await response.json();
    //console.log(helperArray);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function apiCounters() {//receiving counters
  try {
    const response = await fetch("https://easydev.club/api/v1/todos");
    const data = await response.json();
    const taskCounterArray = [
      data.info.all,
      data.info.completed,
      data.info.inWork,
    ];
    if (!response.ok) {
      throw new Error(`response status ${response.status}`);
    }
    // console.log("updated");
    return taskCounterArray;
  } catch (error) {
    console.log(error.message);
  }
}

export async function apiCreateTask(userData) {//adding task
  try {
    const response = await fetch("https://easydev.club/api/v1/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error("Failed to add");
    }
  } catch (error) {
    console.log(error.message);
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
  }
}

export async function apiStatusChange(userData) {
  try {
    const response = await fetch(`https://easydev.club/api/v1/todos/${userData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
    if (!response.ok) {
      throw new Error("Failed to change status");
    }
  } catch (error) {
    console.log(error.message);
  }
}

export async function apiTitleChange(userData) {
  try {
    const response = await fetch(`https://easydev.club/api/v1/todos/${userData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
    if (!response.ok) {
      throw new Error("Failed to change the title");
    }
  } catch (error) {
    console.log(error.message);
  }

}