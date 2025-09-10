"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Tipo do item
const ItemTypes = {
  BOX: "box"
};

type DropAreaProps = {
  items: string[];
  onDrop: (item: { name: string }) => void;
  title: string;
  color: string;
};

// Componente que pode ser arrastado
function DraggableBox({ name }: { name: string }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { name },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  }));

  return drag(
    <div
      className={`px-4 py-6 rounded-md cursor-move transition-colors duration-300 bg-gray-100 flex flex-col gap-2 `}
    >
      <h3 className="">{name}</h3>
      <p>{name}</p>
    </div>
  );
}

// Área de drop
function DropArea({ items, onDrop, title, color }: DropAreaProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: (item: { name: string }) => onDrop(item),
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  }));

  return (
    <div className="flex flex-col gap-2 min-w-80 h-full flex-1 transition-all duration-300">
      <h2 className="font-bold mb-2 flex items-center gap-2 text-gray-600">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: color }}
        />
        {title} ({items.length})
      </h2>
      {drop(
        <div
          className={`flex-1 h-full w-full border-dashed border-4 border-[#828fa366] rounded-md max-h-[810px] p-1 ${
            items.length !== 0 && "border-none"
          } `}
        >
          <div className="relative w-full h-full flex flex-col gap-3 transition-colors duration-300">
            {isOver && (
              <div className="absolute w-full h-full flex items-center justify-center bg-purple-200 rounded-md">
                {title}
              </div>
            )}
            {items.map(item => (
              <DraggableBox key={item} name={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Board() {
  const [colums, setColums] = useState([
    {
      title: "Todo",
      id: 122,
      items: ["item1"]
    },
    {
      title: "Doing",
      id: 123,
      items: []
    },
    {
      title: "Review",
      id: 124,
      items: []
    },
    {
      title: "Testing",
      id: 125,
      items: []
    },
    {
      title: "Blocked",
      id: 126,
      items: []
    },
    {
      title: "Done",
      id: 127,
      items: []
    }
  ]);

  const colors = [
    "#3B82F6",
    "#FACC15",
    "#34D399",
    "#F97316",
    "#8B5CF6",
    "#EF4444"
  ];

  function handleDrop(item: { name: string }, toColumnID: number) {
    setColums(prev => {
      // 1 - copia o estado atual
      const newCols = [...prev];

      // 2 - remove o item de onde ele estava
      const fromIndex = newCols.findIndex(col => col.items.includes(item.name));
      if (fromIndex !== -1) {
        newCols[fromIndex].items = newCols[fromIndex].items.filter(
          i => i !== item.name
        );
      }

      // 3 - adiciona no destino
      const toIndex = newCols.findIndex(col => col.id === toColumnID);
      if (toIndex !== -1) {
        newCols[toIndex].items = [...newCols[toIndex].items, item.name];
      }

      return newCols;
    });
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex transition-colors duration-300 gap-8 p-6 pb-0 bg-gray-neutral w-full h-full overflow-x-auto">
        {colums.map((col, index) => (
          <DropArea
            key={col.id}
            items={col.items}
            onDrop={item => handleDrop(item, col.id)}
            title={col.title}
            color={colors[index]}
          />
        ))}

        <div className="min-w-80 h-full flex flex-col items-center gap-2">
          <span className="h-8 " />

          <span className="w-full flex flex-1 gap-2 bg-gray-100 items-center justify-center max-h-[810px] rounded-md cursor-pointer text-2xl text-gray-500 hover:opacity-80 transition-all duration-200">
            <Plus />
            Adicionar Nova Coluna
          </span>
        </div>
      </div>
    </DndProvider>
  );
}
