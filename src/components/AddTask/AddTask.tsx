import { useState } from "react";
import { createTask } from "../../api/api.js";
import { validate } from "../../utils/validate.js";
import Button from "../UI/Buttons/Button.js";
import type { TaskData, Validator } from "../../types/Todos.js";

import styles from "./AddTask.module.css";

export default function AddTask({ handleUpdate }: { handleUpdate: () => Promise<void> }) {
  const [taskName, setTaskName] = useState<string>("");
  const [validation, setValidation] = useState<Validator>({ isValid: true });

  function handleTaskName(event: React.ChangeEvent<HTMLInputElement>): void {
    setTaskName(event.target.value);
    setValidation({ isValid: true });
  }

  async function setSubmit(): Promise<void> {
    const taskData: TaskData = { isDone: false, title: taskName };

    if (validate(taskName).isValid) {
      try {
        const response = await createTask(taskData);
        console.log(`"${taskName}" task created`, response);

        if (!response.ok) {
          throw new Error("Failed to upload!");
        } else {
          setTaskName(""); //clear input only if task is created
        }
      } catch (error) {
        alert(`Failed to create task! ${error}`);
      }
      handleUpdate();
    } else {
      setValidation(validate(taskName));

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
        <Button onClick={setSubmit} typeButton="add" />
      </div>
      {!validation.isValid ? (
        <p className={styles.errortext}>{validation.errorMessage}</p>
      ) : (
        <p></p>
      )}
    </div>
  );
}
