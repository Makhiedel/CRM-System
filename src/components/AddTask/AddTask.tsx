import { useState } from "react";
import { apiCreateTask } from "../../api/api.js";
import { validator } from "../../utils/validator.js";
import Button from "../UI/Buttons/Button.js";
import type { UserInputTask } from "../../types/Todos.js";

import styles from './AddTask.module.css'

export default function AddTask({ handleUpdate }:{handleUpdate:Function}) {
  const [taskName, setTaskName] = useState<string>("");
  const [isValid, setValid] = useState<boolean>(false);

  function handleTaskName(event:React.ChangeEvent<HTMLInputElement>) {
    setTaskName(event.target.value);
    setValid(false);
  }

  async function setSubmit() {
    const taskData:UserInputTask = { isDone: false, title: taskName };
    if (validator(taskName)) {
      try {
        const response = await apiCreateTask(taskData);
        console.log(`"${taskName}" task created`, response)
      } catch (error) {
        alert(`Failed to create task! ${error}`);
      };
      handleUpdate();
      setTaskName("");
    } else {
      setValid(true);
      setTaskName("");
    }
  }

  return (
    <div className={styles.taskcreator}>
      <div className={styles.taskcreatorrow}>
        <input
          onChange={handleTaskName}
          type="text"
          placeholder="Task to be done..."
          value={taskName}
        />
        <Button onClick={setSubmit} typeButton="add"/>
      </div>
      {isValid ? (
        <p className={styles.errortext}>Text should be 2-64 characters long!</p>
      ) : (
        <p></p>
      )}
    </div>
  );
}
