import { useState, useEffect } from "react";

import "./App.css";
import TaskCreation from "./components/TaskCreation";
import Selection from "./components/Selection";
import Task from "./components/Task";

function App() {
  //let page = 0; //variable for current page of filtered tasks: 0 - all, 1 - inwork, 2 - done
  const tasksArray = [];
  const [tasks, setTasks] = useState(tasksArray);
  const [page, setPage] = useState(0);

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

  async function updateList(array = dataUpdater(), CurPage = 0) {
    // 1 param - filtered array of tasks, 2 param - filter number (page)
    const dataArray = await array;
    // const isTheSame = dataArray.every(element => element.STATUS === dataArray[0].STATUS); //check if all elements with the same status
    // if (!isTheSame) {
    //   page = 0; //first page
    // } else if (isTheSame && !dataArray[0].STATUS) {
    //   page = 1; //second page
    // } else if (isTheSame && dataArray[0].STATUS) {
    //   page = 2; //third page
    // }

    const helperArray = await dataArray.map(({ ID, TITLE, STATUS }) => (
      <div key={ID}>
        <Task
          id={ID}
          title={TITLE}
          status={STATUS}
          currentPage={CurPage}
          updater={allTasks}
          updateDone={doneTasks}
          updateInWork={inWorkTasks}
        ></Task>
      </div>
    ));

    setTasks(helperArray);
  }

  async function allTasks() {
    //to derive all tasks
    const filteredArray = await dataUpdater();
    setPage(0);
    updateList(filteredArray, 0);
  }

  async function inWorkTasks() {
    //for in work tasks
    const initArray = await dataUpdater();
    const filteredArray = [];
    for (const element of initArray) {
      if (!element.STATUS) {
        filteredArray.push(element);
      }
    }

    setPage(1);
    updateList(filteredArray, 1);
  }

  async function doneTasks() {
    //for done tasks
    const initArray = await dataUpdater();
    // console.log(initArray);
    const filteredArray = [];
    for (const element of initArray) {
      if (element.STATUS) {
        filteredArray.push(element);
      }
    }

    setPage(2);
    updateList(filteredArray, 2);
  }

  useEffect(() => {
    updateList();
  }, []);

  return (
    <>
      <div className="main-container">
        <TaskCreation
          updater={allTasks}
          updateDone={doneTasks}
          updateInWork={inWorkTasks}
          currentPage={page}
        />
        <Selection
          updater={allTasks}
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
