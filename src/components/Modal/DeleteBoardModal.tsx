import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { useActiveBoardStore } from "@/hooks/use-active-board";
import { useBoardStore } from "@/hooks/use-board-store";
import Button from "../Button";

export default function DeleteBoardModal({ task }: { task?: boolean }) {
  const { activeBoard } = useActiveBoardStore();
  const { deleteBoard } = useBoardStore();

  function handleDeleteBoard() {
    if (activeBoard) {
      deleteBoard(activeBoard.boardID);
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="hover:opacity-70 transition-all duration-200 text-red-500 text-md hover:cursor-pointer font-bold">
        Deletar Quadro
      </DialogTrigger>
      <DialogContent className="bg-gray-100 border-none flex flex-col gap-5">
        <DialogTitle className="text-red-500 font-bold text-2xl">
          Excluir o quadro {activeBoard?.title}?
        </DialogTitle>
        <DialogDescription className="text-gray-500 font-bold text-md ">
          Tem certeza de que deseja excluir o quadro
          <strong className="text-gray-200">
            {" "}
            {activeBoard?.title}?{" "}
          </strong>{" "}
          Esta ação removerá todas as colunas e tarefas e não poderá ser
          revertida.
        </DialogDescription>

        <div className="flex gap-3">
          <DialogTrigger asChild>
            <Button variant="secondary">Não</Button>
          </DialogTrigger>
          <Button variant="delete" onClick={handleDeleteBoard}>
            Sim, excluir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
