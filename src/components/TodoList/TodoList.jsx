import { useEffect } from "react";

export default function TodoList({tasks}) {


  useEffect(() => {
  }, [tasks]);

  return <>{tasks}</>;
}
