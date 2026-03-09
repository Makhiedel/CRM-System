import { useState } from "react";
import { apiDeleteTask } from "../../api/api.js";
import { apiChangeTodo } from "../../api/api.js";
import { validator } from "../../utils/validator.js";
import Button from "../UI/Buttons/Button.js";
import styles from "./Task.module.css";

export default function Task({ task, updater }) {
  const [isValid, setValid] = useState(true); //validation control
  const [isEditing, setEditing] = useState(false); //editing mode for conditional output
  const [newTitle, setNewTitle] = useState(task.title); //title change handler
  const [oldTitle, setOldTitle] = useState(task.title); //old title saver
  const [isCompl, setIsDone] = useState(task.isDone); //taks status handler

  function handleInput(event) {
    setNewTitle(event.target.value);
    setValid(true);
  }

  function cancelEdit() {
    setNewTitle(oldTitle)
    setValid(true);
    setEditing(false);
  }

  async function handleStatusChange() {
    setIsDone((value) => !value);
    const UserData = {};
    UserData.isDone = !task.isDone;
    UserData.id = task.id;
    try {
      await apiChangeTodo(UserData);
    } catch (error) {
      alert(`Failed to change status, ${error}`);
    }
    updater();
  }

  async function handleNewTitle() {
    const userData = { title: newTitle, id: task.id };
    console.log(userData);
    if (validator(newTitle)) {
      try {
        setValid(true);
        await apiChangeTodo(userData);
        console.log(`Task changed to ${newTitle}`);
      } catch (error) {
        alert(`Failed to change title, ${error}`);
      }
      setEditing(false);
      setOldTitle(newTitle); //if cancel
    } else {
      setValid(false);
    }
  }

  async function startEdit() {
    setEditing(true);
  }

  async function handleDeleteTask() {
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
        {!isValid ? (
          <p className={styles.errortext}>
            Text should be 2-64 characters long!
          </p>
        ) : (
          <></>
        )}
      </li>
  );
}
