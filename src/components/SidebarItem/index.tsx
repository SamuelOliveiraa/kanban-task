import { LayoutPanelLeft } from "lucide-react";

type SidebarItemProps = {
  active?: boolean;
  children: React.ReactNode;
};

export default function SidebarItem({ active, children }: SidebarItemProps) {
  return (
    <div
      className={`hover:bg-purple-200 hover:cursor-pointer text-gray-600 hover:text-white w-full rounded-r-full transition-all duration-200 ${
        active ? "bg-purple-200 text-white" : "bg-none"
      }`}
    >
      <div className="flex items-center gap-2 py-3 px-6">
        <LayoutPanelLeft />
        <span className="font-bold">{children}</span>
      </div>
    </div>
  );
}
