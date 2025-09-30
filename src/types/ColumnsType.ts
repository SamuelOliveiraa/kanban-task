export interface Columns {
  columnsID: string;
  name: string;
  tasks?: Tasks[];
}

export interface Tasks {
  taskID: string;
  title: string;
  status: string;
  description?: string;
  subTasks?: SubTasks[];
}

export interface SubTasks {
  subTaskID: string;
  title: string;
  completed: boolean;
}
