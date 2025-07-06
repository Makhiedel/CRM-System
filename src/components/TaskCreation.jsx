import { useState } from "react";
import { apiCreateTask } from "../api/api";

export default function TaskCreation({ updater }) {
  const [taskName, setTaskName] = useState("");

  const UserData = {};
  function handleTaskName(event) {
    setTaskName(event.target.value);
  }

  async function handleTaskCreation(event) {
    event.preventDefault(); //to prevnt reloading after form submission
    UserData.isDone = false;
    UserData.title = taskName;
    await apiCreateTask(UserData);
    console.log(`"${taskName}" task created`);
    updater();
    setTaskName(""); //useRef needed
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
