import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { useBoardStore } from "@/hooks/use-board-store";
import { Plus, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import Button from "../Button";

type FormValues = {
  name: string;
  columns: { value: string }[];
};

export default function CreateBoardModal() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      columns: [{ value: "" }]
    }
  });
  const { addBoard } = useBoardStore();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns"
  });

  function handleSumbitForm(data: FormValues) {
    const payload = {
      name: data.name,
      columns: data.columns.map(coll => coll.value).filter(Boolean) // Remove itens vazios
    };

    addBoard(payload.name, payload.columns);

    reset();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
  }

  return (
    <Dialog>
      <DialogTrigger className="">Criar novo Quadro</DialogTrigger>

      <DialogContent className="border-none bg-gray-100 m-0">
        <DialogTitle className="font-bold text-2xl">
          Criar novo Quadro
        </DialogTitle>
        <div className="flex flex-col gap-3">
          <label className="font-bold text-xs">Nome</label>
          <input
            {...register("name", { required: "O nome é obrigatiorio" })}
            placeholder="ex. Primeiro Projeto"
            className={`bg-transparent border border-gray-border focus:border-purple-200 active:border-purple-200 focus-visible:border-purple-200 rounded-sm w-full p-2 placeholder:text-gray-600 ${
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
                  className={`bg-transparent border border-gray-border focus:border-purple-200 active:border-purple-200 focus-visible:border-purple-200 rounded-sm w-full p-2 placeholder:text-gray-600 ${
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
          <Button type="submit" onClick={handleSubmit(handleSumbitForm)}>
            Criar novo Quadro
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
