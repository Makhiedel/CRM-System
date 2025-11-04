import { useState } from "react";
import { apiCreateTask } from "../../api/api";
import { validator } from "../../utils/validator";

import styles from './AddTask.module.css'

export default function AddTask({ currentPage, handleUpdate }) {
  const [taskName, setTaskName] = useState("");
  const [isValid, setValid] = useState(false);

  function handleTaskName(event) {
    setTaskName(event.target.value);
    setValid(false);
  }

  async function setSubmit() {
    const UserData = { isDone: false, title: taskName };
    if (validator(taskName)) {
      await apiCreateTask(UserData);
      console.log(`"${taskName}" task created`);
      handleUpdate(currentPage);
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
        <button onClick={setSubmit}>Add</button>
      </div>
      {isValid ? (
        <p className={styles.errortext}>Text should be 2-64 characters long!</p>
      ) : (
        <p></p>
      )}
    </div>
  );
}
