import { Board } from "@/types/BoardTypes";
import { SubTasks, Tasks } from "@/types/ColumnsType";
import { nanoid } from "nanoid";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useActiveBoardStore } from "./use-active-board";

interface BoardStore {
  boardData: Board[];
  addBoard: (title: string, columnsNames: string[]) => void;
  editBoard: (boardID: string, title: string, columns: string[]) => void;
  deleteBoard: (boardID: string) => void;
  getBoardByID: (boardID?: string) => Board | undefined;

  // Tasks
  moveTask: (
    boardID: string,
    taskId: string,
    fromColumnID: string,
    toColumnId: string
  ) => void;
  addTask: (
    boardID: string,
    columnID: string,
    title: string,
    status: string,
    description?: string,
    subTaks?: SubTasks[]
  ) => void;
  changeSubtasksCompleted: (
    boardID: string,
    taksID: string,
    subTaskID: string
  ) => void;
  deleteTask: (boardID: string, columnID: string, taskID: string) => void;
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
            tasks: []
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
      moveTask: (boardID, taskId, fromColumnID, toColumnId) => {
        set({
          boardData: get().boardData.map(board => {
            if (board.boardID !== boardID) return board;

            const fromColumn = board.columns.find(
              col => col.columnsID === fromColumnID
            );
            if (!fromColumn) return board; // coluna inexistente

            const taskToMove = fromColumn.tasks?.find(
              task => task.taskID === taskId
            );
            if (!taskToMove) return board; // nao tem nada a mover

            // clona as colunas atualizadas
            const updatedColumns = board.columns.map(col => {
              // remove da origem
              if (col.columnsID === fromColumnID) {
                return {
                  ...col,
                  tasks: col.tasks?.filter(task => task.taskID !== taskId)
                };
              }

              if (col.columnsID === toColumnId) {
                // Adiciona no destino
                return {
                  ...col,
                  tasks: [...(col.tasks ?? []), taskToMove]
                };
              }

              return col;
            });

            return { ...board, columns: updatedColumns };
          })
        });
      },
      getBoardByID: boardID => {
        return get().boardData.find(board => board.boardID === boardID);
      },
      addTask: (boardID, columnID, title, status, description, subTasks) => {
        const board = get().getBoardByID(boardID);
        if (!board) return; // se board não existe, sai

        // cria a nova task
        const newTask: Tasks = {
          taskID: nanoid(),
          title,
          description,
          status,
          subTasks
        };

        // cria  um novo board atualizado
        const updatedBoard = {
          ...board,
          columns: board.columns.map(column =>
            column.columnsID === columnID
              ? { ...column, tasks: [...(column.tasks ?? []), newTask] }
              : column
          )
        };

        // atualiza o estado do store
        set({
          boardData: get().boardData.map(existingBoard =>
            existingBoard.boardID === boardID ? updatedBoard : existingBoard
          )
        });
      },
      changeSubtasksCompleted: (boardID, taskID, subTaskID) => {
        const { boardData } = get();

        const updatedBoards = boardData.map(board => {
          if (board.boardID !== boardID) return board;

          return {
            ...board,
            columns: board.columns.map(column => {
              if (!column.tasks) return column;
              return {
                ...column,
                tasks: column.tasks.map(task => {
                  if (task.taskID !== taskID) return task;

                  return {
                    ...task,
                    subTasks: task.subTasks?.map(subtask =>
                      subtask.subTaskID === subTaskID
                        ? { ...subtask, completed: !subtask.completed }
                        : subtask
                    )
                  };
                })
              };
            })
          };
        });

        set({ boardData: updatedBoards });
      },
      deleteTask: (boardID, columnID, taskID) => {
        const { boardData } = get();

        const updatedBoards = boardData.map(board => {
          if (board.boardID !== boardID) return board;

          return {
            ...board,
            columns: board.columns.map(column => {
              if (column.columnsID !== columnID) return column;

              return {
                ...column,
                tasks: column.tasks?.filter(task => task.taskID !== taskID)
              };
            })
          };
        });

        set({ boardData: updatedBoards });
      }
    }),
    {
      name: "board-storage",
      skipHydration: false // já hidrata no client
    }
  )
);
