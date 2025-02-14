export interface User {
  id: number;
  name: string;
}

export interface Task {
  id: number;
  task: string;
  category: string;
  completed: string;
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

export interface onClickProp {
  onClick: (userId: number, task: string, category: string) => void;
}
