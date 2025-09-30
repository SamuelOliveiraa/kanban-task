import { useActiveBoardStore } from "@/hooks/use-active-board";
import { useBoardStore } from "@/hooks/use-board-store";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";

type TaksItemProps = {
  taskID: string;
  subTaskID: string;
  title: string;
  checked?: boolean;
};

export default function TaskItem({
  title,
  checked,
  subTaskID,
  taskID
}: TaksItemProps) {
  const { activeBoard } = useActiveBoardStore();
  const { changeSubtasksCompleted } = useBoardStore();

  function handleToggleCheckbox() {
    if (activeBoard) {
      changeSubtasksCompleted(activeBoard?.boardID, taskID, subTaskID);
    }
  }

  return (
    <label
      className="p-4 bg-gray-neutral rounded-md flex items-center gap-3 hover:opacity-100 opacity-85 cursor-pointer"
      htmlFor={`taks-${title}`}
    >
      <Checkbox
        id={`taks-${title}`}
        onClick={handleToggleCheckbox}
        checked={checked}
        className=""
      />
      <label
        htmlFor={`taks-${title}`}
        className={cn(checked && "line-through text-gray-500")}
      >
        {title}
      </label>
    </label>
  );
}
