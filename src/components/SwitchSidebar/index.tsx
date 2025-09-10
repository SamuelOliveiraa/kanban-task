"use client";

import { PanelRightOpen } from "lucide-react";
import { useSidebar } from "../ui/sidebar";

export default function SwitchSidebar() {
  const { state, toggleSidebar } = useSidebar();
  return (
    <>
      {state === "collapsed" && (
        <div
          className={`p-1 transition-all duration-200 hover:bg-gray-600 rounded-md hover:cursor-pointer w-fit mx-2 z-10 ${
            state === "collapsed" ? "absolute" : "hidden"
          }`}
          onClick={toggleSidebar}
        >
          <PanelRightOpen size={24} />
        </div>
      )}
    </>
  );
}
