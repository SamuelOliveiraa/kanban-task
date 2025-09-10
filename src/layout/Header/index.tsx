import Button from "@/components/Button";
import SidebarItem from "@/components/SidebarItem";
import SwitchTheme from "@/components/SwitchTheme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus } from "lucide-react";
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

        <div className="flex items-center gap-4 md:hidden">
          <Image
            src={"/logo.svg"}
            alt="Logo Website"
            aria-label="Logo Website"
            width={24}
            height={24}
          />

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center justify-center gap-2 ">
              <h2 className="font-bold text-2xl truncate max-w-32 sm:max-w-64">
                Titleeeeeeeeeeeeeeee 1
              </h2>
              <ChevronDown size={16} />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="border-gray-border bg-gray-100 max-w-64 gap-3 px-0 py-4 flex flex-col pr-3">
              <span className="text-gray-600 truncate w-full uppercase font-bold text-sm space tracking-widest px-6">
                All Boards (2)
              </span>

              <div className="flex flex-col flex-1 overflow-y-scroll max-h-96">
                <SidebarItem active>Primeiro Teste</SidebarItem>
                <SidebarItem>Primeiro Teste</SidebarItem>
                <SidebarItem>Primeiro Teste</SidebarItem>
              </div>
              <div className="flex flex-col gap-4 justify-center px-4">
                <Button>
                  <Plus size={14} />
                  Criar nova Tabela
                </Button>
                <SwitchTheme />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex gap-3">
          <Button>
            <Plus size={16} />
            <span className="hidden sm:block">Adicionar Tarefa</span>
          </Button>
          <MenuDropdown />
        </div>
      </div>
    </header>
  );
}
