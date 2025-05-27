import { useState } from "react";

export default function Task({
  title,
  id,
  status,
  updater,
  updateDone,
  updateInWork,
  currentPage,
}) {
  const [isEditing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [oldTitle, setOldTitle] = useState(title);
  const [isInputDisabled, setInputDisabled] = useState(true);
  const [isDone, setIsDone] = useState(!status);
  const [selectedLine, setSelectedLine] = useState("");

  function updaterHelper() {
    if (currentPage === 0) {
      updater(); //for all
    } else if (currentPage === 1) {
      updateInWork(); // for inWork
    } else if (currentPage === 2) {
      updateDone(); //for Done
    }
  }

  function handleTitleChange(event) {
    setNewTitle(event.target.value);
    // console.log();
  }

  async function handleStatusChange() {
    setIsDone((value) => !value);
    const UserData = {};
    UserData.isDone = isDone;
    UserData.id = id;
    fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UserData),
    }).then(() => {
      updaterHelper();
    });
  }

  function handleNewTitle(isClicked, id) {
    function handleEdit(id, TITLE) {
      const UserData = {};
      UserData.title = TITLE;
      UserData.id = id;
      // console.log(UserData.TITLE);
      fetch(`https://easydev.club/api/v1/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(UserData),
      });
      setOldTitle(TITLE); //saving old title in case of calncelling changes
    }
    if (isClicked) {
      setSelectedLine("selected"); //highlight input
      setEditing(true);
      setInputDisabled(false);
    }
    if (!isClicked) {
      setSelectedLine(""); //unhighlight input
      console.log(`Task changed to ${newTitle}`);
      // updater(); // removed bc messing up filtration
      handleEdit(id, newTitle);
      setEditing(false);
      setInputDisabled(true);
    }
  }

  async function handleDeleteTask(id, TITLE) {
    await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    updaterHelper(); //refresh array
    console.log(`Task "${TITLE}" deleted`);
  }

  function handleCancel() {
    setSelectedLine(""); //unhiglight input
    setEditing(false);
    setInputDisabled(true);
    setNewTitle(oldTitle); //refresh title changes
  }

  return (
    <div key={id} className="task-holder">
      <input
        className={"checkbox"}
        type="checkbox"
        defaultChecked={status}
        onChange={() => handleStatusChange(status, id)}
      />
      {!isEditing ? (
        <>
          <p className={selectedLine}>{oldTitle}</p>
          <button onClick={() => handleNewTitle(true, id)}>Edit</button>
          <button onClick={() => handleDeleteTask(id, title)}>Delete</button>
        </>
      ) : (
        <>
          <input
            className={selectedLine}
            type="text"
            defaultValue={newTitle}
            onChange={handleTitleChange}
            disabled={isInputDisabled}
          />
          <button onClick={() => handleNewTitle(false, id)}>Save</button>
          <button onClick={() => handleCancel()}>Cancel</button>
        </>
      )}
    </div>
  );
}