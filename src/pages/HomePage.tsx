import { useState, useEffect} from "react";

import { fetchTasks } from "../api/api.js";
import AddTask from "../components/AddTask/AddTask.js";
import TaskFilter from "../components/TaskFilter/TaskFilter.js";
import TodoList from "../components/TodoList/TodoList.js";
import Task from "../components/Task/Task.js";
import type {Todo, QueryFilter, Todos, TodoElements, Counters} from "../types/Todos.js";

export default function Todo() {
  const [tasks, setTasks] = useState<TodoElements>(); //tasks
  const [page, setPage] = useState<QueryFilter>("all"); //query param for filtration
  const [CounterData, setCounterData] = useState<Counters>({all:0,inWork:0,completed:0}); //data for counters

  async function fetcher():Promise<void> {
    try {
      const data:Todos = await fetchTasks(page);
      const helperArray:TodoElements = data!.data.map((task) => (
        <ul key={task.id}>
          <Task task={task} updater={fetcher} />
        </ul>
      ));
      setTasks(helperArray); //tasks deriving
      setCounterData(data?.info); //counters
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
        taskCounter={CounterData}
        state={tasks}
        currentPage={page}
        handleUpdate={setPage}
      />
      <TodoList tasks={tasks} />
    </div>
  );
}
