import { useEffect, useState } from "react";

export default function TasksHolder({ updateTasks }) {
  const tasksArray = [];
  const [tasks, setTasks] = useState(tasksArray);

  function Task({ title, id }) {
    const [isEditing, setEditing] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [isInputDisabled, setInputDisabled] = useState(true);

    function handleTitleChange(event) {
      setNewTitle(event.target.value);
      // console.log(newTitle);
    }

    function handleNewTitle(status, id) {

      function handleEdit(id, title) {
        const UserData = {};
        UserData.title = title;
        UserData.id = id;
        console.log(UserData.title);
        fetch(`https://easydev.club/api/v1/todos/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(UserData),
          })
      }

      if (status) {
        setEditing(true);
        setInputDisabled(false);
      }
      if (!status) {
        console.log(`Task changed to ${newTitle}`);
        handleEdit(id, newTitle)
        setEditing(false);
        setInputDisabled(true);
      }
    }

    return (
      <div key={id} className="task-holder">
        <input className="checkbox" type="checkbox" />
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

  async function updateList() {
    // fetch("https://easydev.club/api/v1/todos")
    //   .then((res) => {
    //     return res.json();
    //   })
    updateTasks().then((data) => {
      async function deriveTasks(data) {
        const helperArray = await data.data.map(({ title, id }) => (
          <div key={id}>
            <Task id={id} title={title}></Task>
          </div>
        ));

        setTasks(helperArray);
      }
      deriveTasks(data);
    });
  }

  useEffect(() => {
    updateList();
  }, []);

  // updateList();

  async function handleDeleteTask(id, title) {
    await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    updateList(); //list update (I FIXED IT ADDING ASYNC AWAIT!)
    console.log(`Task "${title}" deleted`);
  }

  return <>{tasks}</>;
}

//we need to change the update functionality - done, not really
//create a data fetching function inside the main component - done
//send it via props to the child components, so the useEffect would trigger the deriving tasks - done

//I don't understand how this component is connected to the data retrieving function of the main component*
//what cause it to rerender?? There is no props related to the dataUpdater()*

//remaining features:
//handle edit (in progress) - done
//handle task completion status
