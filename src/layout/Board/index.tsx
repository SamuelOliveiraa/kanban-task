"use client";

import CreateBoardModal from "@/components/Modal/CreateBoardModal";
import SelectTaksModal from "@/components/Modal/SelectTaksModal";
import TaskCompleted from "@/components/TaskCompleted";
import { useActiveBoardStore } from "@/hooks/use-active-board";
import { useBoardStore } from "@/hooks/use-board-store";
import { Tasks } from "@/types/ColumnsType";
import { Plus } from "lucide-react";
import { useMemo } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Tipo do item
const ItemTypes = {
  BOX: "box"
};

type DropAreaProps = {
  tasks?: Tasks[];
  onDrop: (item: DragItem, toColumnID: string, boardID: string) => void;
  title: string;
  color: string;
  columnID: string;
  boardID: string;
};

type DragItem = {
  taskID: string;
  fromColumnID: string;
};

// Componente que pode ser arrastado
function DraggableBox({
  task,
  fromColumnID
}: {
  task: Tasks;
  fromColumnID: string;
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { taskID: task.taskID, fromColumnID },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  }));

  return drag(
    <div className="rounded-md transition-colors duration-300 bg-gray-100 cursor-pointer">
      <SelectTaksModal tasks={task}>
        <h3 className="font-bold text-lg">{task.title}</h3>
        <p className="text-gray-500 font-bold text-base flex gap-1">
          <TaskCompleted task={task} />
          <span>sub-tarefas</span>
        </p>
      </SelectTaksModal>
    </div>
  );
}

// Área de drop
function DropArea({
  tasks = [],
  onDrop,
  title,
  color,
  columnID,
  boardID
}: DropAreaProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: (item: DragItem) => onDrop(item, columnID, boardID),
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  }));

  return (
    <div className="flex flex-col gap-2 min-w-60 md:min-w-80 md:max-w-80 h-full flex-1 transition-all duration-300">
      <div className="font-bold text-md uppercase mb-2 flex items-center gap-2 text-gray-600 ">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="truncate max-w-60">{title}</span>
        <span>({tasks.length})</span>
      </div>
      {drop(
        <div
          className={`flex-1 h-full w-full overflow-auto border-dashed border-4 border-[#828fa366] rounded-md max-h-[810px] mb-4 ${
            tasks.length !== 0 && "border-none"
          } `}
        >
          <div className="relative w-full h-full flex flex-col gap-3 transition-all duration-300">
            {isOver && (
              <div className="transition-all duration-300 absolute w-full h-full flex items-center justify-center bg-purple-200 rounded-md text-md uppercase text-white">
                {title}
              </div>
            )}
            {tasks.map(item => (
              <DraggableBox
                key={item.taskID}
                task={item}
                fromColumnID={columnID}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Board() {
  const colors = [
    "#3B82F6",
    "#FACC15",
    "#34D399",
    "#F97316",
    "#8B5CF6",
    "#EF4444"
  ];

  const { activeBoard } = useActiveBoardStore();
  const { boardData, moveTask } = useBoardStore();
  const boardActive = useMemo(() => {
    return boardData.find(item => item.boardID === activeBoard?.boardID);
  }, [activeBoard?.boardID, boardData]);

  function handleDrop(item: DragItem, toColumnID: string, boardID: string) {
    if (!boardID) return;
    if (item.fromColumnID === toColumnID) return; // nada a fazer
    moveTask(boardID, item.taskID, item.fromColumnID, toColumnID);
  }

  return (
    <>
      {activeBoard === null ? (
        <div className="flex flex-1 justify-center flex-col gap-2 items-center  w-full h-full text-center">
          <h1 className="text-2xl">Nenhum quadro selecionado</h1>

          <p className="text-sm md:text-lg text-gray-600">
            Por favor selecione ou crie um quadro para podermos começar
          </p>
        </div>
      ) : (
        <DndProvider backend={HTML5Backend}>
          <div className="flex transition-all duration-300 gap-8 px-6 bg-gray-neutral w-full h-full overflow-auto pt-3">
            {boardActive?.columns.map((col, index) => (
              <DropArea
                key={col.columnsID}
                tasks={col.tasks}
                onDrop={handleDrop}
                title={col.name}
                color={colors[index]}
                columnID={col.columnsID}
                boardID={boardActive.boardID}
              />
            ))}

            {boardActive?.columns && boardActive.columns.length < 5 && (
              <CreateBoardModal boardID={boardActive?.boardID}>
                <div className="min-w-60 md:min-w-80 md:max-w-80 h-full flex flex-col items-center gap-2">
                  <span className="h-8 " />

                  <span className="w-full flex flex-1 gap-2 bg-gray-100 items-center justify-center max-h-[810px] rounded-md cursor-pointer text-xl text-gray-500 hover:opacity-80 transition-all duration-200 p-4">
                    <Plus />
                    Adicionar Nova Coluna
                  </span>
                </div>
              </CreateBoardModal>
            )}
          </div>
        </DndProvider>
      )}
    </>
  );
}
