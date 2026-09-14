import { useState, useEffect, type ReactNode } from "react";
import styles from "./Filter.module.css";
import Selector from "./Selector.js";
import type { QueryFilter, Counters, Todos } from "../../types/Todos.js";

interface Props {
  taskCounter: Counters;
  state: Todos;
  currentPage: QueryFilter;
  handleUpdate: React.Dispatch<React.SetStateAction<QueryFilter>>; //seter
}

export default function TaskFilter({
  taskCounter,
  state,
  currentPage,
  handleUpdate,
}: Props) {
  const [all, setAll] = useState<number>(0);
  const [completed, setCompleted] = useState<number>(0);
  const [inWork, setInWork] = useState<number>(0);

  function updateTaskCounters(): void {
    if (taskCounter === undefined) {
      setAll(0);
      setInWork(0);
      setCompleted(0);
    } else {
      setAll(taskCounter.backlog);
      setInWork(taskCounter.inProgress);
      setCompleted(taskCounter.todo);
    }
  }

  useEffect(() => {
    updateTaskCounters();
  }, [state]);

  return (
    <div className={styles.selectionholder}>
      <Selector
        currentPage={currentPage}
        displayName={"Все"}
        filter={"backlog"}
        quantity={all}
        handleUpdate={handleUpdate}
      />
      <Selector
        currentPage={currentPage}
        displayName={"В работе"}
        filter={"inProgress"}
        quantity={inWork}
        handleUpdate={handleUpdate}
      />
      <Selector
        currentPage={currentPage}
        displayName={"Выполнены"}
        filter={"todo"}
        quantity={completed}
        handleUpdate={handleUpdate}
      />
    </div>
  );
}
