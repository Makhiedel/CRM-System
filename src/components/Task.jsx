import { useState } from "react";

export default function Task({ title, id, status, updater }) {
    const [isEditing, setEditing] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [isInputDisabled, setInputDisabled] = useState(true);
    const [isDone, setIsDone] = useState(!status);

    function handleTitleChange(event) {
      setNewTitle(event.target.value);
      // console.log(newTitle);
    }

    function handleStatusChange() {
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
      });
      updater();
    }

    function handleNewTitle(isClicked, id) {
      function handleEdit(id, title) {
        const UserData = {};
        UserData.title = title;
        UserData.id = id;
        // console.log(UserData.title);
        fetch(`https://easydev.club/api/v1/todos/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(UserData),
        });
      }

      if (isClicked) {
        setEditing(true);
        setInputDisabled(false);
      }
      if (!isClicked) {
        console.log(`Task changed to ${newTitle}`);
        updater();
        handleEdit(id, newTitle);
        setEditing(false);
        setInputDisabled(true);
      }
    }

    async function handleDeleteTask(id, title) {
    await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    updater();
    console.log(`Task "${title}" deleted`);
  }

    return (
      <div key={id} className="task-holder">
        <input
          className="checkbox"
          type="checkbox"
          defaultChecked={status}
          onChange={() => handleStatusChange(status, id)}
        />
        <input
          type="text"
          defaultValue={title}
          onChange={handleTitleChange}
          disabled={isInputDisabled}
        />
        {!isEditing ? (
          <button onClick={() => handleNewTitle(true, id)}>Edit</button>
        ) : (
          <button onClick={() => handleNewTitle(false, id)}>Save</button>
        )}
        <button onClick={() => handleDeleteTask(id, title)}>Delete</button>
      </div>
    );
  }