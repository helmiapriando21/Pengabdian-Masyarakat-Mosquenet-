import { MouseEventHandler } from "react";

interface SidebarButtonProps {
  label: string,
  action: MouseEventHandler<HTMLButtonElement>,
  pathname: string,
  currentPath: string
}

export default function SidebarButton({ label, action, pathname, currentPath }: SidebarButtonProps) {
  return (
    <button 
      onClick={action}
      className={`w-full h-max px-4 py-2 shadow-md ${currentPath.startsWith(pathname) ? "bg-yellow-400 text-white" : "bg-yellow-200 text-black"} hover:bg-yellow-400 hover:text-white text-start rounded-md font-bold `}
    >
      {label}
    </button>
  );
}