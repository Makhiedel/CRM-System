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
      setAll(taskCounter.all);
      setInWork(taskCounter.inWork);
      setCompleted(taskCounter.completed);
    }
  }

  useEffect(() => {
    updateTaskCounters();
  }, [state]);

  return (
    <div className={styles.selectionholder}>
      <Selector
        currentPage={currentPage}
        displayName={"All"}
        filter={"all"}
        quantity={all}
        handleUpdate={handleUpdate}
      />
      <Selector
        currentPage={currentPage}
        displayName={"In work"}
        filter={"inWork"}
        quantity={inWork}
        handleUpdate={handleUpdate}
      />
      <Selector
        currentPage={currentPage}
        displayName={"Done"}
        filter={"completed"}
        quantity={completed}
        handleUpdate={handleUpdate}
      />
    </div>
  );
}
