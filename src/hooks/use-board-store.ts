import { Board } from "@/types/BoardTypes";
import { nanoid } from "nanoid";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useActiveBoardStore } from "./use-active-board";

interface BoardStore {
  boardData: Board[];
  addBoard: (title: string, columnsNames: string[]) => void;
  editBoard: (boardID: string, title: string, columns: string[]) => void;
  deleteBoard: (boardID: string) => void;
  moveTaks: (
    boardID: string,
    taskId: string,
    fromColumnID: string,
    toColumnId: string
  ) => void;
  /*deleteTask: (boardID: string, columnID: string, taskID: string) => void; */
}

export const useBoardStore = create<BoardStore>()(
  persist(
    (set, get) => ({
      boardData: [],
      addBoard: (title, columnsNames) => {
        const { setActiveBoard } = useActiveBoardStore.getState();
        const boardID = nanoid();

        const newBoard: Board = {
          boardID,
          title,
          columns: columnsNames.map(collName => ({
            columnsID: nanoid(),
            name: collName,
            taks: []
          }))
        };

        setActiveBoard({ title, boardID });
        set({ boardData: [...get().boardData, newBoard] });
      },
      editBoard: (boardID, title, columns) => {
        set({
          boardData: get().boardData.map(board => {
            if (board.boardID !== boardID) return board;

            // atualiza o titulo somente
            const updatedBoard: Board = {
              ...board,
              title
            };

            if (columns) {
              updatedBoard.columns = columns.map((collName, index) => {
                const existingColumn = board.columns[index];
                return {
                  columnsID: existingColumn?.columnsID ?? nanoid(), //mantem id se existir
                  name: collName,
                  tasks: existingColumn?.tasks ?? [] // mantem tasks se existir
                };
              });
            }
            return updatedBoard;
          })
        });
      },
      deleteBoard: boardID => {
        const { setActiveBoard } = useActiveBoardStore.getState();

        set({
          boardData: get().boardData.filter(board => board.boardID !== boardID)
        });

        setActiveBoard(null);
      },
      moveTaks: (boardID, taskId, fromColumnID, toColumnId) => {
        set({
          boardData: get().boardData.map(board => {
            if (board.boardID !== boardID) return board;

            //clona as colunas
            const updatedColumns = board.columns.map(col => {
              // remove da origem
              if (col.columnsID === fromColumnID) {
                return {
                  ...col,
                  tasks: col.tasks?.filter(task => task.taskID === taskId)
                };
              }

              // adiciona no destino
              if (col.columnsID === toColumnId) {
                const taskToMove = board.columns
                  .find(coll => coll.columnsID === fromColumnID)
                  ?.tasks.find(task => task.taskID === taskId);

                if (taskToMove) {
                  return {
                    ...col,
                    tasks: [...col.tasks, taskToMove]
                  };
                }
              }
              return col;
            });

            return { ...board, columns: updatedColumns };
          })
        });
      }
    }),
    {
      name: "board-storage"
    }
  )
);
