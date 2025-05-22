import { useState, useEffect } from "react";

export default function Selection({ updater, updateDone, updateInWork, taskCounter, state, currentPage}) {
  const [all, setAll] = useState();
  const [completed, setCompleted] = useState();
  const [inWork, setInWork] = useState();
  
  async function handleTaskCounterDisplay() {
    const tasks = await taskCounter();
    setAll(tasks[0]);
    setInWork(tasks[2]);
    setCompleted(tasks[1]);
  }

  useEffect(() => {
    // deriveData();
    handleTaskCounterDisplay();
  }, [state]);
  
  
  return (
    <>
      <div className="selection-holder">
        <p onClick={()=>updater()}>All ({all})</p>
        <p onClick={updateInWork}>In progress ({inWork})</p>
        <p onClick={updateDone}>Done ({completed})</p>
      </div>
    </>
  );
}
