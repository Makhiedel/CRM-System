import { useState } from "react";
import { apiChangeTodo, apiDeleteTask } from "../../api/api.js";
import { validator } from "../../utils/validator.js";
import type { UserInputTask, Todo, Validator } from "../../types/Todos.js";
import Button from "../UI/Buttons/Button.js";
import styles from "./Task.module.css";

export default function Task({
  task,
  updater,
}: {
  task: Todo;
  updater: () => Promise<void>;
}) {
  const [validation, setValidation] = useState<Validator>({ isValid: true }); //validation control
  const [isEditing, setEditing] = useState<boolean>(false); //editing mode for conditional output
  const [newTitle, setNewTitle] = useState<string>(task.title); //title change handler
  const [oldTitle, setOldTitle] = useState<string>(task.title); //old title saver
  const [isCompl, setIsDone] = useState<boolean>(task.isDone); //taks status handler

  function handleInput(event: React.ChangeEvent<HTMLInputElement>):void {
    setNewTitle(event.target.value);
    setValidation({ isValid: true }); //to hide error message
  }

  function cancelEdit():void {
    setNewTitle(oldTitle);
    setValidation({ isValid: true }); //to hide error message
    setEditing(false);
    console.log(task);
  }

  async function handleStatusChange():Promise<void> {
    setIsDone((value) => !value);
    const taskData: UserInputTask = { isDone: !task.isDone, id: task.id };

    try {
      await apiChangeTodo(taskData);
    } catch (error) {
      alert(`Failed to change status, ${error}`);
    }
    updater();
  }

  async function handleNewTitle():Promise<void> {
    const taskData: UserInputTask = { title: newTitle, id: task.id };
    console.log(taskData);
    if (validator(newTitle).isValid) {
      try {
        await apiChangeTodo(taskData);
        console.log(`Task changed to ${newTitle}`);
      } catch (error) {
        alert(`Failed to change title, ${error}`);
      }
      setEditing(false);
      setOldTitle(newTitle); //if cancel
    } else {
      setValidation(validator(newTitle)); //showing error
    }
  }

  function startEdit():void {
    setEditing(true);
  }

  async function handleDeleteTask():Promise<void> {
    try {
      await apiDeleteTask(task.id);
    } catch (error) {
      alert(`Failed to delete task, ${error}`);
    }
    updater();
    console.log(`Task "${task.title}" deleted`);
  }

  return (
    <li key={task.id} className={styles.taskholder}>
      <div className={styles.taskholderrow}>
        <input
          className={styles.checkbox}
          type="checkbox"
          defaultChecked={isCompl}
          onChange={() => handleStatusChange()}
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
      {!validation.isValid ? (
        <p className={styles.errortext}>{validation.errorMessage}</p>
      ) : (
        <></>
      )}
    </li>
  );
}