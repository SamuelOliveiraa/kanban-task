"use client";

import Button from "@/components/Button";
import CreateBoardModal from "@/components/Modal/CreateBoardModal";
import SidebarItem from "@/components/SidebarItem";
import SwitchTheme from "@/components/SwitchTheme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useActiveBoardStore } from "@/hooks/use-active-board";
import { useBoardStore } from "@/hooks/use-board-store";
import { BoardInfo } from "@/types/BoardTypes";
import { ChevronDown, Plus } from "lucide-react";
import Image from "next/image";
import MenuDropdown from "../../components/MenuDropdown";

export default function Header() {
  const { boardData } = useBoardStore();

  const { activeBoard, setActiveBoard } = useActiveBoardStore();

  function handleActiveBoard({ boardID, title }: BoardInfo) {
    setActiveBoard({ boardID, title });
  }

  return (
    <header className="w-full flex items-center bg-gray-100">
      <div className="hidden min-w-80 md:flex items-center gap-4 border-r border-b h-24 border-gray-border p-6 transition-colors duration-200">
        <Image
          src={"/logo.svg"}
          alt="Logo Website"
          aria-label="Logo Website"
          width={24}
          height={24}
        />
        <h1 className="text-4xl text-gray-text text-balance font-bold ">
          kanban
        </h1>
      </div>

      <div className="h-24 flex items-center flex-1 justify-between border-b border-gray-border py-4 px-6  transition-colors duration-200 w-full overflow-hidden">
        <h2 className="hidden md:block text-2xl flex-1 text-gray-text font-bold truncate">
          {activeBoard === null
            ? "Nenhum quadro selecionado"
            : activeBoard?.title}
        </h2>

        <div className="flex items-center gap-4 md:hidden">
          <Image
            src={"/logo.svg"}
            alt="Logo Website"
            aria-label="Logo Website"
            width={24}
            height={24}
          />

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center justify-center gap-2 ">
              {activeBoard === null ? (
                <h2 className="font-bold truncate max-w-32 sm:max-w-64 ">
                  Nenhum quadro selecionado
                </h2>
              ) : (
                <h2 className="font-bold text-2xl truncate max-w-32 sm:max-w-64">
                  {activeBoard?.title}
                </h2>
              )}

              <ChevronDown size={16} />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="border-gray-border bg-gray-100 max-w-64 gap-3 px-0 py-4 flex flex-col pr-3 md:hidden">
              <span className="text-gray-600 truncate w-full uppercase font-bold text-sm space tracking-widest px-6">
                Todos os Quadros ({boardData.length})
              </span>

              <div className="flex flex-col flex-1 overflow-y-scroll max-h-96">
                {boardData.map(board => (
                  <SidebarItem
                    key={board.boardID}
                    active={activeBoard?.boardID === board.boardID}
                    boardID={board.boardID}
                    onClick={() =>
                      handleActiveBoard({
                        boardID: board.boardID,
                        title: board.title
                      })
                    }
                  >
                    {board.title}
                  </SidebarItem>
                ))}
              </div>
              <div className="flex flex-col gap-4 justify-center px-4">
                <Button>
                  <Plus size={14} />
                  <CreateBoardModal />
                </Button>
                <SwitchTheme />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {boardData.length !== 0 && (
          <div className="flex gap-3">
            <Button>
              <Plus size={16} />
              <span className="hidden sm:block">Adicionar Tarefa</span>
            </Button>

            <MenuDropdown />
          </div>
        )}
      </div>
    </header>
  );
}
