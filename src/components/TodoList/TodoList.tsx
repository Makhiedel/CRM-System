import { useEffect } from "react";
import type { TodoElements, Todos } from "../../types/Todos.js";
import Task from "../Task/Task.js";

export default function TodoList({
  tasks,
  updater,
}: {
  tasks: Todos;
  updater: ()=>Promise<void>;
}) {
  console.log(tasks);
  useEffect(() => {}, [tasks]);

  if (tasks === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {tasks.data.map((task) => (
        <Task key={task.id} task={task} updater={updater} />
      ))}
    </>
  );
}
