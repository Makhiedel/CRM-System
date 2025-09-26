import { useState, useEffect } from "react";

export default function Selection({
  taskCounter,
  state,
  currentPage,
  setPage,
}) {
  const [all, setAll] = useState();
  const [completed, setCompleted] = useState();
  const [inWork, setInWork] = useState();

  async function handleTaskCounterDisplay() {
    const tasks = await taskCounter.info;
    // console.log(tasks);
    setAll(tasks.all);
    setInWork(tasks.inWork);
    setCompleted(tasks.completed);
  }

  function handleUpdate(page) {
    setPage(page);
  }

  useEffect(() => {
    handleTaskCounterDisplay();
  }, [state]);

  return (
      <div className="selection-holder">
        {currentPage === "all" ? (
          <p className="selected" onClick={() => handleUpdate("all")}>
            All ({all})
          </p>
        ) : (
          <p onClick={() => handleUpdate("all")}>All ({all})</p>
        )}
        {currentPage === "inWork" ? (
          <p className="selected" onClick={() => handleUpdate("inWork")}>
            In progress ({inWork})
          </p>
        ) : (
          <p onClick={() => handleUpdate("inWork")}>In progress ({inWork})</p>
        )}
        {currentPage === "completed" ? (
          <p className="selected" onClick={() => handleUpdate("completed")}>
            Done ({completed})s
          </p>
        ) : (
          <p onClick={() => handleUpdate("completed")}>Done ({completed})</p>
        )}
      </div>
  );
}
