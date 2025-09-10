"use client";

import Button from "@/components/Button";
import SidebarItem from "@/components/SidebarItem";
import SwitchTheme from "@/components/SwitchTheme";
import {
  Sidebar as ShadCnSidebar,
  SidebarContent,
  useSidebar
} from "@/components/ui/sidebar";
import { PanelRightOpen, Plus } from "lucide-react";

export default function SideBar() {
  const { toggleSidebar } = useSidebar();

  return (
    <ShadCnSidebar className="border-gray-border max-h-[1000px] w-full py-4 transition-all duration-200 pr-5 z-10 bg-gray-100">
      <SidebarContent className="flex gap-6 h-full">
        <div className="flex flex-col gap-4 max-h-[500px] 2xl:max-h-[700px]">
          <div className="flex justify-between items-center w-full">
            <span className="text-gray-600 truncate w-full uppercase font-bold text-sm space tracking-widest px-6">
              All Boards (2)
            </span>

            <div
              className="p-1 transition-colors duration-200 hover:bg-gray-600 rounded-md hover:cursor-pointer"
              onClick={toggleSidebar}
            >
              <PanelRightOpen size={24} />
            </div>
          </div>

          <div className="flex flex-col flex-1 overflow-y-scroll">
            <SidebarItem active>Primeiro Teste</SidebarItem>
            <SidebarItem>Primeiro Teste</SidebarItem>
            <SidebarItem>Primeiro Teste</SidebarItem>
            <SidebarItem>Primeiro Teste</SidebarItem>
            <SidebarItem>Primeiro Teste</SidebarItem>
            <SidebarItem>Primeiro Teste</SidebarItem>
            <SidebarItem>Primeiro Teste</SidebarItem>
            <SidebarItem>Primeiro Teste</SidebarItem>
            <SidebarItem>Primeiro Teste</SidebarItem>
            <SidebarItem>Primeiro Teste</SidebarItem>
            <SidebarItem>Primeiro Teste</SidebarItem>
            <SidebarItem>Primeiro Teste</SidebarItem>

            <SidebarItem>Primeiro Teste</SidebarItem>
            <SidebarItem>Primeiro Teste</SidebarItem>
            <SidebarItem>Primeiro Teste</SidebarItem>
            <SidebarItem>Primeiro Teste</SidebarItem>
            <SidebarItem>Primeiro Teste</SidebarItem>
            <SidebarItem>Primeiro Teste</SidebarItem>
            <SidebarItem>Primeiro Teste</SidebarItem>
            <SidebarItem>Primeiro Teste</SidebarItem>
          </div>
        </div>

        <div className="flex flex-col gap-4 justify-center">
          <Button>
            <Plus size={14} />
            Criar nova Tabela
          </Button>
          <SwitchTheme />
        </div>
      </SidebarContent>
    </ShadCnSidebar>
  );
}
