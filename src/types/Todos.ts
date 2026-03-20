import type { ReactElement, ReactNode } from "react";

export type Todo = {
  id: number;
  title: string;
  created: string;
  isDone: boolean;
};

export type Counters = {all: number, completed: number, inWork: number} | undefined

export type RawTodo = {
  data: Array<Todo>;
  info: Counters;
}|undefined; 

export type TodoProps = {
  tasks: Todo[];
}|undefined;

export type QueryFilter = "all" | "inWork" | "completed";

export type TodoElements = {
  [key:number]: ReactElement<any>; //redo later, no jsx will be stored in variables
};

export type UserInputTask = {
  isDone?: boolean;
  id?: number;
  title?: string;
}

export type Validator = {
  isValid: boolean;
  errorMessage?: string;
}