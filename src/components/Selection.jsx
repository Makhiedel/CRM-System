import { useState, useEffect } from "react";

export default function Selection({
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
        className={currentPage === filter ? "selected" : ""} 
        onClick={() => handleUpdate(filter)}
      >
        {displayName} ({quantity})
      </p>
    );
  }

  return (
    <div className="selection-holder">
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
