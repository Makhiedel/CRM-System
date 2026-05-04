import { useEffect } from "react";
import type { Todos } from "../../types/Todos.js";
import Task from "../Task/Task.js";

export default function TodoList({
  tasks,
  fetchData,
}: {
  tasks: Todos;
  fetchData: ()=>Promise<void>;
}) {
  console.log(tasks);
  useEffect(() => {}, [tasks]);

  if (tasks === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {tasks.data.map((task) => (
        <Task key={task.id} task={task} fetchData={fetchData} />
      ))}
    </>
  );
}
