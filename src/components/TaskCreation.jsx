import { useState } from "react";
import { apiCreateTask } from "../api/api";
import { useEffect } from "react";

export default function TaskCreation({ currentPage, setPage }) {
  const [taskName, setTaskName] = useState("");

  const page = currentPage;
  const UserData = {};
  function handleTaskName(event) {
    setTaskName(event.target.value);
  }

  function handleUpdate() {
    setPage(page);
  }

  async function handleTaskCreation(event) {
    event.preventDefault(); //to prevent reloading after form submission
    UserData.isDone = false;
    UserData.title = taskName;
    await apiCreateTask(UserData);
    console.log(`"${taskName}" task created`);
    handleUpdate();
    setTaskName(""); 
  }

  return (
    <>
      <form className="task-creator" onSubmit={handleTaskCreation}>
        <input
          className="input"
          onChange={handleTaskName}
          type="text"
          placeholder="Task to be done..."
          required={true}
          minLength={2}
          maxLength={64}
          value={taskName}
        />
        <button className="button">Add</button>
      </form>
    </>
  );
}
