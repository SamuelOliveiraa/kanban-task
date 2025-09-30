import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { useActiveBoardStore } from "@/hooks/use-active-board";
import { useBoardStore } from "@/hooks/use-board-store";
import { Tasks } from "@/types/ColumnsType";
import { Plus, X } from "lucide-react";
import { nanoid } from "nanoid";
import { useFieldArray, useForm } from "react-hook-form";
import Button from "../Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";

type CreateTaskModalProps = {
  children: React.ReactNode;
};

export default function CreateTaskModal({ children }: CreateTaskModalProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm<Tasks>({
    defaultValues: {
      title: "",
      description: "",
      status: "",
      subTasks: [{ completed: false, title: "" }]
    }
  });

  const seletedColumn = watch("status");

  const { boardData, addTask, getBoardByID } = useBoardStore();
  const { activeBoard } = useActiveBoardStore();

  const allStatus = boardData.find(
    item => item.boardID === activeBoard?.boardID
  )?.columns;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subTasks"
  });

  function handleSumbitForm(data: Tasks) {
    const payload = {
      title: data.title,
      status: data.status,
      description: data.description,
      subtasks: data.subTasks
        ?.filter(subtask => subtask.title.trim() !== "") // remove vazios
        .map(subtask => ({
          subTaskID: nanoid(),
          title: subtask.title,
          completed: subtask.completed ?? false
        }))
    };
    const columnID = getBoardByID(activeBoard?.boardID)?.columns.find(
      column => column.name === payload.status
    );

    if (activeBoard?.boardID && columnID?.columnsID) {
      addTask(
        activeBoard?.boardID,
        columnID?.columnsID,
        payload.title,
        payload.status,
        payload.description,
        payload.subtasks
      );
    }
    console.log(payload);

    reset();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
  }

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent className="border-none bg-gray-100 m-0">
        <DialogTitle className="font-bold text-2xl">
          Adicionar nova tarefa
        </DialogTitle>

        {/* Title */}
        <div className="flex flex-col gap-3">
          <label className="font-bold text-xs">Titulo</label>
          <input
            {...register("title", { required: "O titulo é obrigatorio" })}
            placeholder="ex. Pausa para o café"
            className={`bg-transparent outline-none border border-gray-border focus:border-purple-200 active:border-purple-200 focus-visible:border-purple-200 rounded-sm w-full p-2 placeholder:text-gray-600 ${
              errors.title && "border-red-500"
            }`}
          />
          {errors.title && (
            <span className="text-sm text-red-500">
              Este campo nao pode estar vazio
            </span>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-3">
          <label className="font-bold text-xs">Descrição</label>
          <textarea
            {...register("description")}
            placeholder="ex. É sempre bom parar para tomar um café. Esses 15 minutos de pausa recarregam um pouco as energias."
            className="h-36 outline-none bg-transparent border border-gray-border focus:border-purple-200 active:border-purple-200 focus-visible:border-purple-200 rounded-sm w-full p-2 placeholder:text-gray-600 overflow-auto resize-none"
          />
        </div>

        {/* Sub-Tasks */}
        <div className="flex flex-col gap-3">
          <label className="font-bold text-xs">Sub-Tarefas</label>
          {fields.map((field, index) => (
            <div className="flex flex-col gap-2" key={field.id}>
              <div className="flex gap-3 items-center justify-between">
                <input
                  {...register(`subTasks.${index}.title`, {
                    required: "O nome da sub-tarefa é obrigatorio"
                  })}
                  placeholder="ex. Preparar café"
                  className={`bg-transparent border border-gray-border focus:border-purple-200 outline-none active:border-purple-200 focus-visible:border-purple-200 rounded-sm w-full p-2 placeholder:text-gray-600 ${
                    errors.subTasks !== undefined &&
                    errors.subTasks[index]?.title?.message
                      ? "border-red-500"
                      : ""
                  } `}
                />
                {fields.length > 1 && (
                  <button
                    type="button"
                    className="p-1 focus:border focus:border-purple-200 rounded-sm cursor-pointer outline-none"
                    onClick={() => remove(index)}
                    aria-label={`Remover sub-tarefa ${index + 1}`}
                  >
                    <X size={17} />
                  </button>
                )}
              </div>

              {errors.subTasks?.[index]?.title?.message && (
                <span className="text-sm text-red-500">
                  {errors.subTasks[index].title?.message}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Columns */}
        <div className="flex flex-col gap-3">
          <label className="font-bold text-xs">Coluna</label>

          <DropdownMenu>
            <DropdownMenuTrigger
              {...register("status", {
                required: "A coluna deve ser selecionada"
              })}
              className={`bg-transparent outline-none border border-gray-border focus:border-purple-200 active:border-purple-200 rounded-sm w-full p-2 text-start text-gray-200  ${
                errors.status?.message ? "border-red-500" : ""
              }`}
            >
              {seletedColumn ? seletedColumn : "Status"}
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-[var(--radix-dropdown-menu-trigger-width)] bg-gray-100 border border-gray-border"
            >
              {allStatus?.map(coll => (
                <DropdownMenuItem
                  key={coll.columnsID}
                  className="opacity-70 hover:opacity-100 hover:text-white border border-transparent outline-none focus:border-purple-200 focus-within:border-purple-200 transition-all duration-200 text-gray-600 text-md hover:cursor-pointer font-bold"
                  onClick={() =>
                    setValue("status", coll.name, { shouldValidate: true })
                  }
                >
                  {coll.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {errors.status?.message && (
            <span className="text-sm text-red-500">
              {errors.status.message}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          {fields.length <= 5 && (
            <Button
              variant="secondary"
              onClick={() =>
                append({ subTaskID: nanoid(), title: "", completed: false })
              }
            >
              <Plus />
              Adicionar nova Sub-Tarefa
            </Button>
          )}
          <Button onClick={handleSubmit(handleSumbitForm)}>
            Criar nova tarefa
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
