import { useState } from "react";
import { apiCreateTask } from "../../api/api.js";
import { validator } from "../../utils/validator.js";
import Button from "../UI/Buttons/Button.js";
import type { UserInputTask, Validator } from "../../types/Todos.js";

import styles from "./AddTask.module.css";

export default function AddTask({ handleUpdate }: { handleUpdate: Function }) {
  const [taskName, setTaskName] = useState<string>("");
  const [validation, setValidation] = useState<Validator>({ isValid: true });

  function handleTaskName(event: React.ChangeEvent<HTMLInputElement>):void {
    setTaskName(event.target.value);
    setValidation({ isValid: true });
  }

  async function setSubmit():Promise<void> {
    const taskData: UserInputTask = { isDone: false, title: taskName };

    if (validator(taskName).isValid) {
      try {
        const response = await apiCreateTask(taskData);
        console.log(`"${taskName}" task created`, response);
      } catch (error) {
        alert(`Failed to create task! ${error}`);
      }
      handleUpdate();
      setTaskName("");
    } else {
      setValidation(validator(taskName));

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
