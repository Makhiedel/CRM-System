import Task from "./Task";
import { useEffect } from "react";
// import { fetchTasks } from "../api/api";

export default function TodoList({ tasks, setTasks, page, updater }) {
  // const [tasks, setTasks] = useState(tasksArray);
  // const [page, setPage] = useState(0);

  async function updateList(array) {
    console.log(array);
    const helperArray = await array.data.map(({ id, title, isDone }) => (
      <div key={id}>
        <Task
          id={id}
          title={title}
          status={isDone}
          updater={updaterHelper}
        ></Task>
      </div>
    ));

    setTasks(helperArray);
  }

  async function updaterHelper(filter) {
    try {
      console.log(filter);
      const filteredArray = await updater(filter);
      updateList(filteredArray);
    } catch (error) {
      alert(`Failed to update, ${error}`);
    }
  }

  useEffect(() => {
    updaterHelper(page);
  }, [page]);

  return <>{tasks}</>;
}
