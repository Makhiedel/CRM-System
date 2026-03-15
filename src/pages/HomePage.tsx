import { useState, useEffect} from "react";

import { fetchTasks } from "../api/api.js";
import AddTask from "../components/AddTask/AddTask.js";
import TaskFilter from "../components/TaskFilter/TaskFilter.js";
import TodoList from "../components/TodoList/TodoList.js";
import Task from "../components/Task/Task.js";
import type {Todo, QueryFilter, RawTodo, TodoElements} from "../types/Todos.js";

export default function Todo() {
  const [tasks, setTasks] = useState<TodoElements>(); //tasks
  const [page, setPage] = useState<QueryFilter>("all"); //query param for filtration
  const [fetchedData, setFetchedData] = useState<RawTodo>(); //data for counters

  async function fetcher() {
    try {
      const data:RawTodo = await fetchTasks(page);
      const helperArray:TodoElements = data!.data.map((task) => (
        <ul key={task.id}>
          <Task task={task} updater={fetcher} />
        </ul>
      ));
      setTasks(helperArray); //tasks deriving
      setFetchedData(data); //counters
      // console.log(data);
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
