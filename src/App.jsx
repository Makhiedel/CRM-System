import { useState, useEffect } from "react";

import "./App.css";
import TaskCreation from "./components/TaskCreation";
// import TasksHolder from "./components/TasksHolder";
import Selection from "./components/Selection";
import Task from "./components/Task" ;

function App() {

  const tasksArray = [];
  const [tasks, setTasks] = useState(tasksArray);

  const dataUpdater = async () => {
    const response = await fetch("https://easydev.club/api/v1/todos");
    const data = await response.json();
    const helperArray = await data.data.map(({ title, id, isDone }) => (
       {ID:id, TITLE:title, STATUS:isDone}
    ));
    console.log(helperArray);

    return helperArray;
  };

   async function updateList() {
      const dataArray = await dataUpdater()
      const helperArray = dataArray.map(({ ID, TITLE, STATUS }) => (
        <div key={ID}>
          <Task id={ID} title={TITLE} status={STATUS} updater={updateList}></Task>
        </div>
      ));
      // console.log(helperArray);
      setTasks(helperArray);
    }
    // updateList();

    useEffect(()=> {
      updateList();
    }, [])

  return (
    <>
      <div className="main-container">
        <TaskCreation updater={updateList} />
        <Selection updater={updateList} dataArray={dataUpdater} />
        {/* <TasksHolder updateTasks={dataUpdater} /> */}
        {tasks}
      </div>
    </>
  );
}

export default App;
