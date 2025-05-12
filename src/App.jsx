import "./App.css";
import TaskCreation from "./components/TaskCreation";
import TasksHolder from "./components/TasksHolder";
import Selection from "./components/Selection";

function App() {
 
  const dataUpdater = async () => {
    const response = await fetch("https://easydev.club/api/v1/todos")
        console.log(response);
        return response.json();
      }

  return (
    <>
      <div className="main-container">
        <TaskCreation updateTasks={dataUpdater} />
        <Selection numberOfTasks={{ all: 0, inProgress: 0, done: 0 }} />
        <TasksHolder updateTasks={dataUpdater} />
      </div>
    </>
  );
}

export default App;
