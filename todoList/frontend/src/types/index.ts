export interface User {
  id: number;
  name: string;
}

export interface Task {
  id: number;
  task: string;
  category: string;
  completed: boolean;
}
export interface TasksProp {
  tasks: Task[];
}

export interface notification {
  variant: "default" | "destructive" | null | undefined;
  title: string;
  description: string;
}

export interface AlertModalProps {
  notification: notification;
}

export interface onCreateTaskProp {
  onCreateTask: (userId: number, task: string, category: string) => void;
}
export interface onEditTaskProp {
  onEditTask: (id: number, task: string, category: string) => void;
}
export interface onEditCompletedTaskProp {
  onEditCompletedTask: (id: number) => void;
}
export interface onDeletetTaskProp {
  onDeletetTask: (id: number) => void;
}
