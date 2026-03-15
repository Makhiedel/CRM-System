import { useEffect, type ReactElement } from "react";
import type { TodoElements, Todo } from "../../types/Todos.js";


export default function TodoList({tasks}:{tasks:TodoElements | undefined}) {
  // console.log(tasks);
  useEffect(() => {
  }, [tasks]);

  return <>{tasks}</>;
}

