import { useState } from "react";

import "./App.css";
import { apiCounters as taskCounterUpdater } from "./api/api";
import TaskCreation from "./components/TaskCreation";
import Selection from "./components/Selection";
import TodoList from "./components/TodoList";

function App() {
  // let page = 0; //variable for current page of filtered tasks: 0 - all, 1 - inwork, 2 - done

  const tasksArray = [];
  const [tasks, setTasks] = useState(tasksArray);
  const [page, setPage] = useState(0);
  const [update, setUpdate] = useState(0);

  const updater = () => setUpdate((prev) => prev + 1); //update trigger

  return (
    <>
      <div className="main-container">
        <TaskCreation updater={updater} />
        <Selection
          updater={updater}
          taskCounter={taskCounterUpdater}
          state={tasks}
          currentPage={page}
          setPage={setPage}
        />
        <TodoList
          tasks={tasks}
          setTasks={setTasks}
          page={page}
          updater={update}
        />
      </div>
    </>
  );
}

export default App;
