import { useState, useEffect } from "react";

import "./App.css";
import TaskCreation from "./components/TaskCreation";
import Selection from "./components/Selection";
import Task from "./components/Task";

function App() {
  let page = 0;
  const tasksArray = [];
  const [tasks, setTasks] = useState(tasksArray);

  const taskCounterUpdater = async () => {
    const response = await fetch("https://easydev.club/api/v1/todos");
    const data = await response.json();
    const taskCounterArray = [
      data.info.all,
      data.info.completed,
      data.info.inWork,
    ];
    // console.log("updated");
    return taskCounterArray;
  };

  const dataUpdater = async () => {
    const response = await fetch("https://easydev.club/api/v1/todos");
    const data = await response.json();
    const helperArray = await data.data.map(({ title, id, isDone }) => ({
      ID: id,
      TITLE: title,
      STATUS: isDone,
    }));
    // console.log(helperArray);
    return helperArray;
  };
  
  async function updateList(array = dataUpdater()) {
    const dataArray = await array;
    const isTheSame = dataArray.every(element => element.STATUS === dataArray[0].STATUS); //check if all elements with the same status
    if (!isTheSame) {
      page = 0; //first page
    } else if (isTheSame && !dataArray[0].STATUS) {
      page = 1; //second page
    } else if (isTheSame && dataArray[0].STATUS) {
      page = 2; //third page
    }

    console.log(page);
    
    // console.log(dataArray);
    const helperArray = await dataArray.map(({ ID, TITLE, STATUS }) => (
      <div key={ID}>
        <Task
          id={ID}
          title={TITLE}
          status={STATUS}
          currentPage={page}
          updater={updateList}
          updateDone={doneTasks}
          updateInWork={inWorkTasks}
        ></Task>
      </div>
    ));

    setTasks(helperArray);
  }

  async function doneTasks() {
    const initArray = await dataUpdater();
    // console.log(initArray);
    const filteredArray = [];
    for (const element of initArray) {
      if (element.STATUS) {
        filteredArray.push(element);
      }
    }
    updateList(filteredArray);
  }

  async function inWorkTasks() {
    const initArray = await dataUpdater();
    const filteredArray = [];
    for (const element of initArray) {
      if (!element.STATUS) {
        filteredArray.push(element);
      }
    }
    updateList(filteredArray);
  }

  useEffect(() => {
    updateList();
  }, []);

  return (
    <>
      <div className="main-container">
        <TaskCreation updater={updateList} />
        <Selection
          updater={updateList}
          updateDone={doneTasks}
          updateInWork={inWorkTasks}
          taskCounter={taskCounterUpdater}
          state={tasks}
          currentPage={page}
        />
        {tasks}
      </div>
    </>
  );
}

export default App;
