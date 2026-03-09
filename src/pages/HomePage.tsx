import { useState } from "react";
import { useEffect } from "react";

import { fetchTasks } from "../api/api.js";
import AddTask from "../components/AddTask/AddTask.js";
import TaskFilter from "../components/TaskFilter/TaskFilter.js";
import TodoList from "../components/TodoList/TodoList.js";
import Task from "../components/Task/Task.js";
import type {Todo, QueryFilter} from "../types/Todos.js";

export default function Todo() {
  const [tasks, setTasks] = useState<Todo[]>([]); //tasks
  const [page, setPage] = useState<QueryFilter>("all"); //query param for filtration
  const [fetchedData, setFetchedData] = useState<Todo[]>(); //data for counters

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
