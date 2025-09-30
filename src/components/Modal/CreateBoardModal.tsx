import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { useActiveBoardStore } from "@/hooks/use-active-board";
import { useBoardStore } from "@/hooks/use-board-store";
import { Plus, X } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Button from "../Button";

type FormValues = {
  name: string;
  columns: { value: string }[];
};

type CreateBoardModalProps = {
  children: React.ReactNode;
  boardID?: string | undefined;
};

export default function CreateBoardModal({
  children,
  boardID
}: CreateBoardModalProps) {
  const { addBoard, getBoardByID, editBoard } = useBoardStore();
  const { setActiveBoard } = useActiveBoardStore();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns"
  });

  useEffect(() => {
    const boardToEdit = getBoardByID(boardID);
    const columnsToEdit = boardToEdit?.columns.map(coll => ({
      value: coll.name
    })) || [{ value: "" }];

    reset({
      name: boardToEdit?.title || "",
      columns: columnsToEdit
    });
  }, [boardID, getBoardByID, reset]);

  function handleSumbitForm(data: FormValues) {
    const payload = {
      name: data.name,
      columns: data.columns.map(coll => coll.value).filter(Boolean) // Remove itens vazios
    };
    if (boardID) {
      editBoard(boardID, payload.name, payload.columns);
      setActiveBoard({ boardID, title: payload.name });
      reset();
    } else {
      addBoard(payload.name, payload.columns);
      reset();
    }

    reset();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
  }

  return (
    <Dialog>
      <DialogTrigger className="hover:opacity-70 transition-all duration-200 text-md hover:cursor-pointer font-bold text-start">
        {children}
      </DialogTrigger>

      <DialogContent className="border-none bg-gray-100 m-0">
        <DialogTitle className="font-bold text-2xl">
          {boardID ? "Editar Quadro" : "Criar novo Quadro"}
        </DialogTitle>
        <div className="flex flex-col gap-3">
          <label className="font-bold text-xs">Nome</label>
          <input
            {...register("name", { required: "O nome é obrigatorio" })}
            placeholder="ex. Primeiro Projeto"
            className={`bg-transparent outline-none border border-gray-border focus:border-purple-200 active:border-purple-200 focus-visible:border-purple-200 rounded-sm w-full p-2 placeholder:text-gray-600 ${
              errors.name && "border-red-500"
            }`}
          />
          {errors.name && (
            <span className="text-sm text-red-500">
              Este campo nao pode estar vazio
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <label className="font-bold text-xs">Colunas</label>
          {fields.map((field, index) => (
            <div className="flex flex-col gap-2" key={field.id}>
              <div className="flex gap-3 items-center justify-between">
                <input
                  {...register(`columns.${index}.value`, {
                    required: "O nome da coluna é obrigatorio"
                  })}
                  placeholder="ex. A Fazer"
                  className={`bg-transparent outline-none border border-gray-border focus:border-purple-200 active:border-purple-200 focus-visible:border-purple-200 rounded-sm w-full p-2 placeholder:text-gray-600 ${
                    errors.columns?.[index]?.value && "border-red-500"
                  } `}
                />
                {fields.length >= 2 && (
                  <X
                    size={17}
                    onClick={() => remove(index)}
                    className="cursor-pointer"
                  />
                )}
              </div>

              {errors.columns?.[index]?.value?.message && (
                <span className="text-sm text-red-500">
                  {errors.columns[index]?.value?.message}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {fields.length <= 5 && (
            <Button variant="secondary" onClick={() => append({ value: "" })}>
              <Plus />
              Adicionar nova Coluna
            </Button>
          )}
          <Button onClick={handleSubmit(handleSumbitForm)}>
            {boardID ? "Editar Quadro" : "Criar novo Quadro"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
