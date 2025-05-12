import { useState } from "react";

export default function TaskCreation({updateTasks}) {
  const url = "https://easydev.club/api/v1/todos";
  const [taskName, setTaskName] = useState('Empty');
  const [isTaskCreated, setTaskCreated] = useState(false);
  
  const UserData = {};
  function handleTaskName(event) {
    setTaskName(event.target.value);
  }

  if (isTaskCreated) {
    setTaskCreated(false);
    UserData.title = taskName;
    async function createTask() {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(UserData),
      });
      if (!response.ok) {
        throw new Error("Failed to add");
      } else {console.log(`"${taskName}" task created`);}
      const data = await response.json();
      updateTasks(); //updating list
      return data;
    }
    createTask();
    
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
        <button onClick={() => setTaskCreated(true)}>Add</button>
      </div>
    </>
  );
}

//remaining features:
//task succesfull creation alert/message
//input validation (min 2, max 64), required
