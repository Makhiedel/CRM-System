import type { ReactElement, ReactNode } from "react";

export type Todo = {
  created: string;
  id: number;
  isDone: true;
  title: string;
};

export type Counters =
  | { all: number; completed: number; inWork: number }
  | undefined;

export type Todos = {
  data: [Todo];
  info: Counters;
  meta: {
    totalAmount: number;
  };
}|undefined;

export type TodoProps =
  | {
      tasks: Todo[];
    }
  | undefined;

export type QueryFilter = "all" | "inWork" | "completed";

export type TodoElements = {
  [key: number]: ReactElement; //node stored in variable
};

export type UserInputTask = {
  isDone?: boolean;
  id?: number;
  title?: string;
};

export type Validator = {
  isValid: boolean;
  errorMessage?: string;
};
