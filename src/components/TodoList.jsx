import Task from "./Task";
import { useEffect } from "react";
// import { fetchTasks } from "../api/api";

export default function TodoList({ tasks, setTasks, page, updater }) {
  // const [tasks, setTasks] = useState(tasksArray);
  // const [page, setPage] = useState(0);

  async function updateList(array) {
    // console.log(array);
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

  async function updaterHelper() {
    try {
      if (page === 0) {
        const filteredArray = await updater("all");
        console.log(0);
        updateList(filteredArray);
      } else if (page === 1) {
        const filteredArray = await updater("inWork");
        console.log(1);
        updateList(filteredArray);
      } else if (page === 2) {
        const filteredArray = await updater("completed");
        console.log(2);
        updateList(filteredArray);
      }
    } catch (error) {
      alert(`Failed to update, ${error}`);
    }
  }

  useEffect(() => {
    console.log(page);
    updaterHelper();
  }, [page]);

  return <>{tasks}</>;
}
