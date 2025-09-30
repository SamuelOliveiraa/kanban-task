import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useActiveBoardStore } from "@/hooks/use-active-board";
import { EllipsisVertical } from "lucide-react";
import CreateBoardModal from "../Modal/CreateBoardModal";
import DeleteBoardModal from "../Modal/DeleteBoardModal";

export default function MenuDropdown({ task }: { task?: boolean }) {
  const { activeBoard } = useActiveBoardStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-[1px] rounded-full hover:bg-gray-neutral transition-colors duration-200">
        <EllipsisVertical className="text-gray-500" size={30} />
      </DropdownMenuTrigger>

      {task ? (
        <DropdownMenuContent className="flex flex-col border-gray-border bg-gray-neutral transition-all duration-200 text-md hover:cursor-pointer font-bold p-3 gap-2">
          <CreateBoardModal boardID={activeBoard?.boardID}>
            Editar Tarefa
          </CreateBoardModal>
          <DeleteBoardModal />
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent className="flex flex-col border-gray-border bg-gray-neutral transition-all duration-200 text-md hover:cursor-pointer font-bold p-3 gap-2">
          <CreateBoardModal boardID={activeBoard?.boardID}>
            Editar Quadro
          </CreateBoardModal>
          <DeleteBoardModal />
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
