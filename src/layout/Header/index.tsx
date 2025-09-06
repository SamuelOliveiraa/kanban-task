import Button from "@/components/Button";
import { Plus } from "lucide-react";
import Image from "next/image";
import MenuDropdown from "../../components/MenuDropdown";

export default function Header() {
  return (
    <header className="w-full flex items-center">
      <div className="hidden min-w-80  md:flex items-center gap-4 border-r border-b h-24 border-gray-border p-6 transition-colors duration-200 ">
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
          Teste 1
        </h2>

        <div className="flex gap-3">
          <Button>
            <Plus size={16} /> Adicionar Tarefa
          </Button>
          <MenuDropdown />
        </div>
      </div>
    </header>
  );
}
