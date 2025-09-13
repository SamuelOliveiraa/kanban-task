export interface Columns {
  columnsID: string;
  name: string;
  tasks?: Tasks[];
}

export interface Tasks {
  taskID: string;
  title: string;
  description: string;
  status: string;
  subTasks?: SubTasks[];
}

export interface SubTasks {
  title: string;
  completed: boolean;
}
