import { useState, useEffect, type ReactNode} from "react";
import styles from "./Filter.module.css";
import type {
  TodoElements,
  QueryFilter,
  Counters,
} from "../../types/Todos.js";

export default function TaskFilter({
  taskCounter,
  state,
  currentPage,
  handleUpdate,
}: {
  taskCounter: Counters;
  state: TodoElements | undefined;
  currentPage: QueryFilter;
  handleUpdate: Function;
}) {
  const [all, setAll] = useState<number>();
  const [completed, setCompleted] = useState<number>();
  const [inWork, setInWork] = useState<number>();

  async function handleTaskCounterDisplay():Promise<void> {

    const tasks = taskCounter!;
    setAll(tasks.all);
    setInWork(tasks.inWork);
    setCompleted(tasks.completed);
  }

  useEffect(() => {
    console.log(state);
    handleTaskCounterDisplay();
  }, [state]);

  function Selector({
    currentPage,
    displayName,
    filter,
    quantity,
  }: {
    currentPage: QueryFilter;
    displayName: String;
    filter: QueryFilter;
    quantity: ReactNode; //children prop

  }):ReactNode {
    return (
      <p
        className={currentPage === filter ? styles.selected : ""} //underline
        onClick={() => handleUpdate(filter)}
      >
        {displayName} ({quantity})
      </p>
    );
  }

  return (
    <div className={styles.selectionholder}>
      <Selector
        currentPage={currentPage}
        displayName={"All"}
        filter={"all"}
        quantity={all}
      />
      <Selector
        currentPage={currentPage}
        displayName={"In work"}
        filter={"inWork"}
        quantity={inWork}
      />
      <Selector
        currentPage={currentPage}
        displayName={"Done"}
        filter={"completed"}
        quantity={completed}
      />
    </div>
  );
}
