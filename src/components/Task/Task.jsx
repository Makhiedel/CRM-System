import { useState } from "react";
import { apiDeleteTask } from "../../api/api";
import { apiTodoChange } from "../../api/api";
import { validator } from "../../utils/validator";
import Button from "../UI/Buttons/Button";
import styles from "./Task.module.css";

export default function Task({ task, updater, page }) {
  const [isValid, setValid] = useState(true);
  const [isEditing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [oldTitle, setOldTitle] = useState(task.title);
  const [isInputDisabled, setInputDisabled] = useState(true);
  const [isCompl, setIsDone] = useState(task.isDone);
  const [selectedLine, setSelectedLine] = useState("");

  function handleTitleChange(event) {
    setNewTitle(event.target.value);
  }

  async function handleStatusChange() {
    setIsDone((value) => !value);
    const UserData = {};
    UserData.isDone = !task.isDone;
    UserData.id = task.id;
    try {
      await apiTodoChange(UserData);
    } catch (error) {
      alert(`Failed to change status, ${error}`);
    }
    updater(page);
  }

  async function handleEdit(id, TITLE) {
    const userData = { title: TITLE, id: id };
    if (validator(TITLE)) {
      try {
        setValid(true);
        await apiTodoChange(userData);
        console.log(`Task changed to ${newTitle}`);
      } catch (error) {
        alert(`Failed to change title, ${error}`);
      }
      setOldTitle(TITLE); //saving old title in case of calncelling changes
    } else {
      setValid(false);
    }
  }

  async function handleNewTitle(isClicked) {
    if (isClicked) {
      setSelectedLine("selected"); //highlight input
      setEditing(true);
      setInputDisabled(false);
    }
    if (!isClicked) {
      setSelectedLine(""); //unhighlight input

      await handleEdit(task.id, newTitle);
      setEditing(false);
      setInputDisabled(true);
    }
  }

  async function handleDeleteTask(id, TITLE) {
    try {
      await apiDeleteTask(id);
    } catch (error) {
      alert(`Failed to delete task, ${error}`);
    }
    updater(page);
    console.log(`Task "${TITLE}" deleted`);
  }

  function handleCancel() {
    setSelectedLine(""); //unhiglight input
    setEditing(false);
    setInputDisabled(true);
    setNewTitle(oldTitle); //r  efresh title changes
  }

  return (
    <div key={task.id} className={styles.taskholder}>
      {!isEditing ? ( //viewing mode
        <div className={styles.taskform}>
          <input
            className="checkbox"
            type="checkbox"
            defaultChecked={isCompl}
            onChange={() => handleStatusChange()}
          />
          <p className="selectedLine">{oldTitle}</p>
          <Button
            onClick={() => handleNewTitle(true, task.id)}
            nameButton="Edit"
            styleName="editbutton"
          />
          <Button
            onClick={() => handleDeleteTask(task.id, task.title)}
            nameButton="Delete"
            styleName="delbutton"
          />
        </div>
      ) : (
        //editing mode
        <div className={styles.taskform}>
          <input
            className="checkbox"
            type="checkbox"
            defaultChecked={isCompl}
            onChange={() => handleStatusChange()}
          />
          <input
            className="selected"
            type="text"
            defaultValue={newTitle}
            onChange={handleTitleChange}
            disabled={isInputDisabled}
            required={true}
          />
          <Button
            onClick={() => handleNewTitle(false, task.id)}
            nameButton="Save"
            styleName="savebutton"
          />
          <Button
            onClick={() => handleCancel()}
            value="Cancel"
            nameButton="Cancel"
            styleName="cancelbutton"
          />
          {isValid ? (
            <p className="text">Text should be 2-64 characters long!</p>
          ) : (
            <p></p>
          )}
        </div>
      )}

      {/* <input
        className={"checkbox"}
        type="checkbox"
        defaultChecked={task.status}
        onChange={() => handleStatusChange(task.status, task.id)}
      />
      {!isEditing ? (
        <>
          <p className={selectedLine}>{oldTitle}</p>
          <button onClick={() => handleNewTitle(true, task.id)}>Edit</button>
          <button onClick={() => handleDeleteTask(task.id, task.title)}>
            Delete
          </button>
        </>
      ) : (
        <div className="task-form">
          <input
            className={`${selectedLine} p`}
            type="text"
            defaultValue={newTitle}
            onChange={handleTitleChange}
            disabled={isInputDisabled}
            required={true}
          />
          <input
            type="button"
            className="btn"
            value="Save"
            onClick={() => handleNewTitle(false, task.id)}
          />
          <input
            type="button"
            className="btn"
            onClick={() => handleCancel()}
            value="Cancel"
          />
        </div>
      )} */}
    </div>
  );
}
