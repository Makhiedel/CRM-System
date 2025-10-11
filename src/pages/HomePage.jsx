import { useState } from "react";
import { useEffect } from "react";

import { fetchTasks } from "../api/api";
import TaskCreation from "../components/TaskCreation";
import Selection from "../components/Selection";
import TodoList from "../components/TodoList";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState("all");
  const [fetchedData, setFetchedData] = useState({});


  // async function fetcher(param) {
  //   setPage(param);
  // }
  
  async function fetcher(param) {
    try {
      setPage(param);
      const data = await fetchTasks(param);
      setFetchedData(data);
      console.log(data);
    } catch (error) {
      alert(`Failed to update, ${error}`);
    }
    console.log(param);
  }
  useEffect(() => {

    fetcher(page);
    console.log(fetchedData);
    console.log(tasks);
  }, [page]);

  return (
    <div className="main-container">
      <TaskCreation currentPage={page} handleUpdate={fetcher} />
      <Selection
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
