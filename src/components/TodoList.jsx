import Task from "./Task";
import { useEffect } from "react";
// import { fetchTasks } from "../api/api";

export default function TodoList({ tasks, setTasks, page, updater, data }) {

  async function updateList(array) {
    console.log(array);
    const helperArray = await array.map(({ id, title, isDone }) => (
      <div key={id}>
        <Task
          id={id}
          title={title}
          status={isDone}
          updater={updater}
          page={page}
        ></Task>
      </div>
    ));

    setTasks(helperArray);
  }


  useEffect(() => {
    updateList(data.data);
  }, [data]);

  return <>{tasks}</>;
}
