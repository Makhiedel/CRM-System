import { useState, useEffect } from "react";
import styles from './Filter.module.css';

export default function TaskFilter({
  taskCounter,
  state,
  currentPage,
  handleUpdate,
}) {
  const [all, setAll] = useState();
  const [completed, setCompleted] = useState();
  const [inWork, setInWork] = useState();

  async function handleTaskCounterDisplay() {
    const tasks = await taskCounter.info;
    setAll(tasks.all);
    setInWork(tasks.inWork);
    setCompleted(tasks.completed);
  }

  useEffect(() => {
    console.log(taskCounter);
    handleTaskCounterDisplay();
  }, [state]);

  function Selector({ currentPage, displayName, filter, quantity }) {
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
