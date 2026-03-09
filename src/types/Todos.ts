export type Todo = {
  id: number;
  title: string;
  created: string;
  isDone: boolean;
};

export type TodoProps = {
  tasks: Todo[];
}

export type QueryFilter = "all" | "inWork" | "completed";
