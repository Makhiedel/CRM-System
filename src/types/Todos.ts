export type Todo = [
  {
    id: number;
    title: string;
    description: string;
    executor: {
      id: number;
      name: string;
    };
    creator: {
      id: number;
      name: string;
    };
    status: string;
    deadline: Date;
    createdAt: Date;
    updatedAt: Date;
  },
];

export type Counters =
  | { backlog: number; todo: number; inProgress: number }
  | undefined;

export type Todos =
  | {
      data: [Todo];
      total: number;
      meta: {
        limit: number;
        offset: number;
        statuses: [string];
        executorId: number;
        orderBy: string;
        orderDir: string;
        statusCounts: {
          backlog: number;
          todo: number;
          inProgress: number;
          review: number;
          readyForRelease: number;
          onHold: number;
          done: number;
        };
      };
    }
  | undefined;

export type QueryFilter = "backlog" | "inProgress" | "todo";

export type TaskData = {
  isDone?: boolean;
  id?: number;
  title?: string;
};

export type Validator = {
  isValid: boolean;
  errorMessage?: string;
};
