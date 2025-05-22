import { useState } from "react";

export default function TaskCreation({ updater }) {
  const url = "https://easydev.club/api/v1/todos";
  const [taskName, setTaskName] = useState();

  const UserData = {};
  function handleTaskName(event) {
    setTaskName(event.target.value);
  }

  async function handleTaskCreation(event) {
    event.preventDefault(); //to prevnt reloading after form submission
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
      alert(`"${taskName}" task has created!`);
      console.log(`"${taskName}" task created`);
      updater();
    }
  }

  return (
    <>
      <form className="task-creator" onSubmit={handleTaskCreation} >
        <input
          className="input"
          onChange={handleTaskName}
          type="text"
          placeholder="Task to be done..."
          required={true}
          minLength={2}
          maxLength={64}
        />
        <button className="button">Add</button>
      </form>
    </>
  );
}

//renaining feature: clearing input after creating task
