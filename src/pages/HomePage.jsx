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

  async function fetcher(param) {
    try {
      setPage(param);
      const data = await fetchTasks(param);
      const helperArray = await data.data.map((task) => (
        <div key={task.id}>
          <Task
            task={task}
            updater={fetcher}
            page={page}
          ></Task>
        </div>
      ));
      setTasks(helperArray); //tasks deriving
      setFetchedData(data); //counters
      console.log(data.data);
    } catch (error) {
      alert(`Failed to update, ${error}`);
    }
    console.log(param);
  }

  useEffect(() => {
    fetcher(page);
  }, [page]);

  return (
    <div className="main-container">
      <AddTask currentPage={page} handleUpdate={fetcher} />
      <TaskFilter
        taskCounter={fetchedData}
        state={tasks}
        currentPage={page}
        setPage={setPage}
        handleUpdate={setPage}
      />
      <TodoList
        data={fetchedData}
        tasks={tasks}
        setTasks={setTasks}
        page={page}
        updater={fetcher}
      />
    </div>
  );
}
