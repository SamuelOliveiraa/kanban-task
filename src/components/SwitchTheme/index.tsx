"use client";

import { MoonStarIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "../ui/switch";

export default function SwitchTheme() {
  const { theme, setTheme, systemTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div className="flex items-center justify-center gap-3 bg-gray-neutral p-4  rounded-full">
      <SunIcon className="text-gray-500" size={20} fill="currentColor" />

      <Switch
        checked={currentTheme === "dark"}
        onCheckedChange={checked => setTheme(checked ? "dark" : "light")}
      />
      <MoonStarIcon className="text-gray-500" size={20} fill="currentColor" />
    </div>
  );
}
