import { useState } from "react";

export default function TaskCreation({ updater }) {
  const url = "https://easydev.club/api/v1/todos";
  const [taskName, setTaskName] = useState("Empty");

  const UserData = {};
  function handleTaskName(event) {
    setTaskName(event.target.value);
  }
  
  async function handleTaskCreation() {
    UserData.isDone = false;
    UserData.title = taskName;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UserData),
    });
    if (!response.ok) {
      throw new Error("Failed to add");
    } else {
      console.log(`"${taskName}" task created`);
      updater();
    }
  }
  

  return (
    <>
      <div className="task-creator">
        <input
          onChange={handleTaskName}
          type="text"
          placeholder="Task to be done..."
          required
        />
        <button onClick={() => handleTaskCreation()}>Add</button>
      </div>
    </>
  );
}

//remaining features:
//task succesfull creation alert/message
//input validation (min 2, max 64), required
