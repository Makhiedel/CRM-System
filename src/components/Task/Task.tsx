import { useState } from "react";
import { changeTask, deleteTask } from "../../api/api.js";
import { validate } from "../../utils/validate.js";
import type { TaskData, Todo, Validator } from "../../types/Todos.js";
import Button from "../UI/Buttons/Button.js";
import styles from "./Task.module.css";

interface Props {
  task: Todo;
  fetchData: () => Promise<void>;
}

export default function Task({ task, fetchData }: Props) {
  const [validation, setValidation] = useState<Validator>({ isValid: true }); //validation control
  const [isEditing, setEditing] = useState<boolean>(false); //editing mode for conditional output
  const [newTitle, setNewTitle] = useState<string>(task.title); //title change handler
  const [oldTitle, setOldTitle] = useState<string>(task.title); //old title saver
  const [isComplete, setIsDone] = useState<boolean>(task.isDone); //taks status handler

  function handleInput(event: React.ChangeEvent<HTMLInputElement>): void {
    setNewTitle(event.target.value);
    setValidation({ isValid: true }); //to hide error message
  }

  function cancelEdit(): void {
    setNewTitle(oldTitle);
    setValidation({ isValid: true }); //to hide error message
    setEditing(false);
    console.log(task);
  }

  async function handleStatusChange(): Promise<void> {
    setIsDone((value) => !value);
    const taskData: TaskData = { isDone: !task.isDone, id: task.id };
    try {
      await changeTask(taskData);
      fetchData();
    } catch (error) {
      alert(`Failed to change status, ${error}`);
    }
  }

  async function handleNewTitle(): Promise<void> {
    const taskData: TaskData = { title: newTitle, id: task.id };
  
    if (validate(newTitle).isValid) {
      try {
        await changeTask(taskData);
        console.log(`Task changed to ${newTitle}`);
      } catch (error) {
        alert(`Failed to change title, ${error}`);
      }
      setEditing(false);
      setOldTitle(newTitle); //if cancel
    } else {
      setValidation(validate(newTitle)); //showing error
    }
  }

  function startEdit(): void {
    setEditing(true);
  }

  async function handleDeleteTask(): Promise<void> {
    try {
      await deleteTask(task.id);
    } catch (error) {
      alert(`Failed to delete task, ${error}`);
    }
    fetchData();
    console.log(`Task "${task.title}" deleted`);
  }

  return (
    <li key={task.id} className={styles.taskholder}>
      <div className={styles.taskholderrow}>
        <input
          className={styles.checkbox}
          type="checkbox"
          defaultChecked={isComplete}
          onChange={handleStatusChange}
        />
        <input
          className={styles.selected}
          type="text"
          disabled={!isEditing}
          value={newTitle}
          onChange={handleInput}
        />
        {!isEditing ? ( //viewing
          <>
            <Button onClick={() => startEdit()} typeButton="edit" />
            <Button onClick={() => handleDeleteTask()} typeButton="del" />
          </>
        ) : (
          //editing
          <>
            <Button onClick={() => handleNewTitle()} typeButton="save" />
            <Button onClick={() => cancelEdit()} typeButton="cancel" />
          </>
        )}
      </div>
      {!validation.isValid && (
        <p className={styles.errortext}>{validation.errorMessage}</p>
      )}
    </li>
  );
}
