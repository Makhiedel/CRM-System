import { useState, useEffect } from "react";

export default function Selection({ updater, dataArray }) {
  const [all, setAll] = useState();
  const [completed, setCompleted] = useState();
  const [inWork, setInWork] = useState();

  async function deriveData() {
    const response = await fetch("https://easydev.club/api/v1/todos");
    const data = await response.json();
    setAll(data.info.all);
    setCompleted(data.info.completed);
    setInWork(data.info.inWork);
  }

  async function handleDervieInWorkTasks() {
    const initArray = await dataArray();
    const filteredArray = await initArray.map(({ title, id, isDone }) => (
        {ID:id, TITLE:title, STATUS:isDone}
    ));
    console.log(filteredArray)
  }

  useEffect(() => {
    deriveData();
  }, []);

  return (
    <>
      <div className="selection-holder">
        <p onClick={updater}>All ({all})</p>
        <p onClick={handleDervieInWorkTasks}>In progress ({inWork})</p>
        <p>Done ({completed})</p>
      </div>
    </>
  );
}
