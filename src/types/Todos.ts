export type Todo = {
  id: number;
  title: string;
  created: string;
  isDone: boolean;
};

export type RawTodo = {
  data: Array<Todo>;
  info: {all: Number, completed: Number, inWork: Number};
}; 

export type TodoProps = {
  tasks: Todo[];
};

export type QueryFilter = "all" | "inWork" | "completed";

export type TodoElement = {
  
};

export type UserInputTask = {
  isDone: Boolean;
  id: Number;
}