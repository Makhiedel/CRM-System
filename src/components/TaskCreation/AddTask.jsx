import { useState } from "react";
import { apiCreateTask } from "../../api/api";
import { validator } from "../../utils/validator";
import Button from "../UI/Buttons/Button";

import styles from './AddTask.module.css'

export default function AddTask({ handleUpdate }) {
  const [taskName, setTaskName] = useState("");
  const [isValid, setValid] = useState(false);

  function handleTaskName(event) {
    setTaskName(event.target.value);
    setValid(false);
  }

  async function setSubmit() {
    const userData = { isDone: false, title: taskName };
    if (validator(taskName)) {
      try {
        const response = await apiCreateTask(userData);
        console.log(`"${taskName}" task created`, response)
      } catch (error) {
        alert("Failed to create task!", error);
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
