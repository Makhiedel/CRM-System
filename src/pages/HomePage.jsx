import { useState } from "react";
import { useEffect } from "react";

import "../App.css";
import { fetchTasks } from "../api/api";
import TaskCreation from "../components/TaskCreation";
import Selection from "../components/Selection";
import TodoList from "../components/TodoList";

export default function Todo() {
  const tasksArray = [];
  const [tasks, setTasks] = useState(tasksArray);
  const [page, setPage] = useState(0);
  const [fetchedData, setFetchedData] = useState();

  async function fetcher(param) {
    console.log(param);
    let data = await fetchTasks(param);
    setFetchedData(data);
    return data;
  }

  useEffect(() => {
    // console.log('app.jsx executed');
    // console.log(page);
  }, [tasks]);

  return (
    <>
      <div className="main-container">
        <TaskCreation currentPage={page} setPage={setPage} />
        <Selection
          taskCounter={fetchedData}
          state={tasks}
          currentPage={page}
          setPage={setPage}
        />
        <TodoList
          tasks={tasks}
          setTasks={setTasks}
          page={page}
          updater={fetcher}
        />
      </div>
    </>
  );
}
