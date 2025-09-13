import { LayoutPanelLeft } from "lucide-react";

type SidebarItemProps = React.HTMLAttributes<HTMLDivElement> & {
  active?: boolean;
  children: React.ReactNode;
  boardID: string;
};

export default function SidebarItem({
  active,
  children,
  boardID,
  ...rest
}: SidebarItemProps) {
  return (
    <div
      className={`hover:bg-purple-200 hover:cursor-pointer text-gray-600 hover:text-white w-full rounded-r-full transition-all duration-200 ${
        active ? "bg-purple-200 text-white" : "bg-none"
      }`}
      {...rest}
    >
      <div className="flex items-center gap-2 py-3 px-6">
        <LayoutPanelLeft />
        <span className="font-bold truncate max-w-52">{children}</span>
      </div>
    </div>
  );
}
