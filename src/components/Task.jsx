import { useState } from "react";
import { apiDeleteTask } from "../api/api";
import { apiTodoChange } from "../api/api";
import { validator } from "../utils/validator";

export default function Task({
  // title,
  // id,
  // status,
  task,
  updater,
  page
}) {
  const [isEditing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [oldTitle, setOldTitle] = useState(task.title);
  const [isInputDisabled, setInputDisabled] = useState(true);
  const [isCompl, setIsDone] = useState(!task.isDone);
  const [selectedLine, setSelectedLine] = useState("");


  function handleTitleChange(event) {
    event.preventDefault(); //to prevnt reloading after form submission
    setNewTitle(event.target.value);
  }

  async function handleStatusChange() {
    setIsDone((value) => !value);
    const UserData = {};
    UserData.isDone = isCompl;
    UserData.id = task.id;
    try {
      await apiTodoChange(UserData);
    } catch (error) {
      alert(`Failed to change status, ${error}`);
    }
    updater(page);
    
  }

  async function handleNewTitle(isClicked, id) {
    async function handleEdit(id, TITLE) {

      const userData = {title:TITLE, id:id}
      if 
      (validator(TITLE))
      {
        try {
          await apiTodoChange(userData);
          console.log(`Task changed to ${newTitle}`);
        } catch (error) {
          alert(`Failed to change title, ${error}`);
        }
        setOldTitle(TITLE); //saving old title in case of calncelling changes
      }
      else {
        alert("Title should be 2-64 characters long!");
      }
    }
    if (isClicked) {
      setSelectedLine("selected"); //highlight input
      setEditing(true);
      setInputDisabled(false);
    }
    if (!isClicked) {
      setSelectedLine(""); //unhighlight input
      
      // updater(); // removed bc messing up filtration
      await handleEdit(task.id, newTitle);
      setEditing(false);
      setInputDisabled(true);
    }
  }

  async function handleDeleteTask(id, TITLE) {
    try {
      await apiDeleteTask(id);
    } catch (error) {
      alert(`Failed to delete task, ${error}`)
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
    <div key={task.id} className="task-holder">
      <input
        className={"checkbox"}
        type="checkbox"
        defaultChecked={task.status}
        onChange={() => handleStatusChange(task.status, task.id)}
      />
      {!isEditing ? (
        <>
          <p className={selectedLine}>{oldTitle}</p>
          <button onClick={() => handleNewTitle(true, task.id)}>Edit</button>
          <button onClick={() => handleDeleteTask(task.id, task.title)}>Delete</button>
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
          <input type="button" className="btn" value="Save" onClick={() => handleNewTitle(false, task.id)}/>
          <input type="button" className="btn" onClick={() => handleCancel()} value="Cancel" />
        </div>
      )}
    </div>
  );
}

