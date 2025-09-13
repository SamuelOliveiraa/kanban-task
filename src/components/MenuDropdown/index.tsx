import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import DeleteBoardModal from "../Modal/DeleteBoardModal";

export default function MenuDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-[1px] rounded-full hover:bg-gray-neutral transition-colors duration-200">
        <EllipsisVertical className="text-gray-500" size={30} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-gray-border bg-gray-neutral px-4 py-2">
        <DropdownMenuItem className="hover:opacity-70 transition-all duration-200 text-gray-600 text-md hover:cursor-pointer font-bold">
          Editar Quadro
        </DropdownMenuItem>
        <DeleteBoardModal />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
