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
    <>
      <div className="selection-holder">
        {currentPage === 0 ? (
          <p className="selected" onClick={() => handleUpdate(0)}>
            All ({all})
          </p>
        ) : (
          <p onClick={() => handleUpdate(0)}>All ({all})</p>
        )}
        {currentPage === 1 ? (
          <p className="selected" onClick={() => handleUpdate(1)}>
            In progress ({inWork})
          </p>
        ) : (
          <p onClick={() => handleUpdate(1)}>In progress ({inWork})</p>
        )}
        {currentPage === 2 ? (
          <p className="selected" onClick={() => handleUpdate(2)}>
            Done ({completed})
          </p>
        ) : (
          <p onClick={() => handleUpdate(2)}>Done ({completed})</p>
        )}
      </div>
    </>
  );
}
