import { useState, useEffect } from "react";

export default function Selection({ updater, updateDone, updateInWork, taskCounter, state, currentPage }) {
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
        {currentPage === 0 ? <p className="selected" onClick={()=>updater()}>All ({all})</p>
        :<p onClick={()=>updater()}>All ({all})</p>} 
        {currentPage === 1 ? <p className="selected" onClick={()=>updateInWork()}>In progress ({inWork})</p>
        :<p onClick={updateInWork}>In progress ({inWork})</p>}
        {currentPage === 2 ? <p className="selected" onClick={()=>updateDone()}>Done ({completed})</p>
        :<p onClick={updateDone}>Done ({completed})</p>}
      </div>
    </>
  );
}


//bugs: highlight selected filter