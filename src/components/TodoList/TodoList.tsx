import { useEffect } from "react";
import type { TodoProps } from "../../types/Todos.js";


export default function TodoList({tasks}:TodoProps) { //incorrect type - it's html objects inside

  useEffect(() => {
  }, [tasks]);

  return <>{tasks}</>;
}

