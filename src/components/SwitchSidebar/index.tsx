"use client";

import { Eye, EyeOff } from "lucide-react";
import { useSidebar } from "../ui/sidebar";

export default function SwitchSidebar() {
  const { state, toggleSidebar } = useSidebar();
  return (
    <>
      {state === "collapsed" ? (
        <div
          className="absolute bottom-10 left-80 bg-purple-200 w-12 p-2 rounded-br-full rounded-tr-full cursor-pointer"
          onClick={toggleSidebar}
        >
          <Eye />
        </div>
      ) : (
        <div
          className="flex items-center justify-center gap-2 p-2 rounded-full hover:bg-purple-200 hover:text-white cursor-pointer transition-colors duration-200 text-gray-400 uppercase text-sm"
          onClick={toggleSidebar}
        >
          <EyeOff />
          <span>Ocultar menu</span>
        </div>
      )}
    </>
  );
}
