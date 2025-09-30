import { Tasks } from "@/types/ColumnsType";
import MenuDropdown from "../MenuDropdown";
import TaskItem from "../TaksItem";
import TaskCompleted from "../TaskCompleted";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

type SelectTaksModalProps = {
  tasks: Tasks;
  children: React.ReactNode;
};

export default function SelectTaksModal({
  tasks,
  children
}: SelectTaksModalProps) {
  return (
    <Dialog>
      <DialogTrigger className="px-4 py-6 flex flex-col items-start gap-2 w-full ">
        {children}
      </DialogTrigger>

      <DialogContent className="border-none bg-gray-100 m-0">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">{tasks?.title} </h2>
          <MenuDropdown />
        </div>

        <p className="text-sm text-gray-500">
          {tasks?.description?.trim() || "Sem descrição"}
        </p>

        <span className="font-bold text-sm">
          Sub-Taks (<TaskCompleted task={tasks} />)
        </span>

        <div className="flex flex-col gap-2">
          {tasks.subTasks?.map(task => (
            <TaskItem
              taskID={tasks.taskID}
              subTaskID={task.subTaskID}
              key={task.subTaskID}
              title={task.title}
              checked={task.completed}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
