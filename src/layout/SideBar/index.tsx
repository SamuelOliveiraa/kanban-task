"use client";

import Button from "@/components/Button";
import CreateBoardModal from "@/components/Modal/CreateBoardModal";
import SidebarItem from "@/components/SidebarItem";
import SwitchSidebar from "@/components/SwitchSidebar";
import SwitchTheme from "@/components/SwitchTheme";
import {
  Sidebar as ShadCnSidebar,
  SidebarContent
} from "@/components/ui/sidebar";
import { useActiveBoardStore } from "@/hooks/use-active-board";
import { useBoardStore } from "@/hooks/use-board-store";
import { BoardInfo } from "@/types/BoardTypes";
import { Plus } from "lucide-react";

export default function SideBar() {
  const allBoards = [
    {
      boardID: "123",
      title: "Teste 1",
      tables: [
        { tableID: "11", title: "Todo", task: [] },
        { tableID: "13", title: "Doing", task: [] }
      ]
    },
    { boardID: "124", title: "Teste 22", tables: [] }
  ];
  const { boardData } = useBoardStore();

  const { activeBoard, setActiveBoard } = useActiveBoardStore();

  function handleActiveBoard({ boardID, title }: BoardInfo) {
    setActiveBoard({ boardID, title });
  }

  return (
    <ShadCnSidebar className="border-gray-border bg-gray-100" variant="inset">
      <SidebarContent className="flex gap-6 h-full w-full">
        <div className="flex flex-col flex-1 gap-4 max-h-[500px] 2xl:max-h-[700px]">
          <div className="flex flex-col justify-between items-center w-full px-6 gap-3">
            <span
              className={`${
                boardData.length === 0 ? "text-white" : "text-gray-600"
              } truncate w-full uppercase font-bold text-sm space tracking-widest`}
            >
              Todos os Quadros ({boardData.length})
            </span>

            {boardData.length === 0 && (
              <p className="text-gray-600">
                Crie um quadro para podermos começar
              </p>
            )}
          </div>

          <div className="flex flex-col flex-1 overflow-auto">
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
        </div>

        <div className="flex flex-col gap-4 justify-center pl-5">
          <Button>
            <Plus size={14} />
            <CreateBoardModal />
          </Button>
          <SwitchTheme />
          <SwitchSidebar />
        </div>
      </SidebarContent>
    </ShadCnSidebar>
  );
}
