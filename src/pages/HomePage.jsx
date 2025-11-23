import { useState } from "react";
import { useEffect } from "react";

import { fetchTasks } from "../api/api";
import AddTask from "../components/TaskCreation/AddTask";
import TaskFilter from "../components/Selection/TaskFilter";
import TodoList from "../components/TodoList/TodoList";
import Task from "../components/Task/Task";

export default function Todo() {
  const [tasks, setTasks] = useState([]); //tasks
  const [page, setPage] = useState("all"); //query param for filtration
  const [fetchedData, setFetchedData] = useState({}); //data for counters

  async function fetcher() {
    try {
      const data = await fetchTasks(page);
      const helperArray = await data.data.map((task) => (
        <ul key={task.id}>
          <Task task={task} updater={fetcher} />
        </ul>
      ));
      setTasks(helperArray); //tasks deriving
      setFetchedData(data); //counters
      console.log(data.data);
    } catch (error) {
      alert(`Failed to update, ${error}`);
    }
  }

  useEffect(() => {
    fetcher();
    const autoUpdate = setInterval(fetcher, 5000);
    return () => clearInterval(autoUpdate);
  }, [page]);

  return (
    <div className="main-container">
      <AddTask handleUpdate={fetcher} />
      <TaskFilter
        taskCounter={fetchedData}
        state={tasks}
        currentPage={page}
        handleUpdate={setPage}
      />
      <TodoList tasks={tasks} />
    </div>
  );
}
