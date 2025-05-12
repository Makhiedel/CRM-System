export default function Selection({numberOfTasks}) {

  return (
    <>
      <div className="selection-holder">
        <p>All ({numberOfTasks.all})</p>
        <p>In progress ({numberOfTasks.inProgress})</p>
        <p>Done ({numberOfTasks.done})</p>
      </div>
    </>
  );
}
