import Task from "./Task";
import { useEffect } from "react";
import { allTasksFetch, inWorkTasksFetch, doneTasksFetch } from "../api/api";

export default function TodoList({ tasks, setTasks, page, updater }) {
  // const [tasks, setTasks] = useState(tasksArray);
  // const [page, setPage] = useState(0);

  async function updateList(array = inWorkTasksFetch()) {
    const tasksArray = await array;
    
    const helperArray = await tasksArray.data.map(({ id, title, isDone }) => (
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
    if (page === 0) {
      const filteredArray = await allTasksFetch();
      console.log(0);
      updateList(filteredArray);
    } else if (page === 1) {
      const filteredArray = await inWorkTasksFetch();
      console.log(1);

      updateList(filteredArray);
    } else if (page === 2) {
      const filteredArray = await doneTasksFetch();
      console.log(2);

      updateList(filteredArray);
    }
  }

  useEffect(() => {
    updaterHelper()
  }, [updater]);

  return <>{tasks}</>;
}