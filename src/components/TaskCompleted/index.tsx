import { Tasks } from "@/types/ColumnsType";

type TaksCompletedProps = {
  task: Tasks;
};

export default function TaskCompleted({ task }: TaksCompletedProps) {
  const tasksCompleted = task.subTasks?.filter(task => task.completed === true);

  return (
    <>
      {tasksCompleted ? tasksCompleted.length : "0"} de {task.subTasks?.length}
    </>
  );
}
