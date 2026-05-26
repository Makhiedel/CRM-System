import { useState } from "react";
import { createTask } from "../../api/api.js";
import axios from "axios";
import { validate } from "../../utils/validate.js";
import Button from "../UI/Buttons/Button.js";
import type { TaskData, Validator } from "../../types/Todos.js";

import styles from "./AddTask.module.css";

interface Props {
  handleUpdate: () => Promise<void>;
}

export default function AddTask({ handleUpdate }: Props) {
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
        setTaskName(""); //clear input only if task is created
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("HTTP error", error.response?.status, error.message);
        } else {
          console.log(`Failed to create task! ${error}`);
        }
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
      {!validation.isValid && (
        <p className={styles.errortext}>{validation.errorMessage}</p>
      )}
    </div>
  );
}
