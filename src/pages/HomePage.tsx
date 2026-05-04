import { useState, useEffect } from "react";

import { fetchTasks } from "../api/api.js";
import AddTask from "../components/AddTask/AddTask.js";
import TaskFilter from "../components/TaskFilter/TaskFilter.js";
import TodoList from "../components/TodoList/TodoList.js";
import type { QueryFilter, Todos, Counters } from "../types/Todos.js";

export default function HomePage() {
  const [tasks, setTasks] = useState<Todos>(); //tasks
  const [queryFilter, setQueryFilter] = useState<QueryFilter>("all"); //query param for filtration
  const [counterData, setCounterData] = useState<Counters>(); //data for counters

  async function fetchData(): Promise<void> {
    try {
      const data: Todos = await fetchTasks(queryFilter);
      setTasks(data);

      if (data === undefined) {
        setCounterData({
          all: 0,
          inWork: 0,
          completed: 0,
        });
      } else {
        setCounterData(data.info); //counters
      }
    } catch (error) {
      alert(`Failed to update, ${error}`);
    }
  }

  useEffect(() => {
    fetchData();
    const autoUpdate = setInterval(fetchData, 5000);
    return () => clearInterval(autoUpdate);
  }, [queryFilter]);

  return (
    <div className="main-container">
      <AddTask handleUpdate={fetchData} />
      <TaskFilter
        taskCounter={counterData}
        state={tasks}
        currentPage={queryFilter}
        handleUpdate={setQueryFilter}
      />
      <TodoList tasks={tasks} fetchData={fetchData} />
    </div>
  );
}
