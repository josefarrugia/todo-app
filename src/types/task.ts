export interface Task {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface TaskUpdate {
  todo: string;
  completed: boolean;
}
