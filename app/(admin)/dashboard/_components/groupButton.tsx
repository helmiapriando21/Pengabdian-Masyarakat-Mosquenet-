"use client"

import { useState } from "react";
import SidebarButton from "./sidebarButton";

export default function GroupButton({ label, children, currentPath, pathname }: any) {
  const [isOpen, setIsOpen] = useState<boolean>(currentPath.startsWith(pathname));

  return (
    <div className={`flex flex-col ${isOpen ? "gap-5" : "gap-0"}`}>
      <SidebarButton
        label={label}
        action={() => setIsOpen(!isOpen)}
        currentPath={currentPath}
        pathname={pathname}
      />
      <div 
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="flex flex-col gap-3 px-7">{children}</div>
      </div>
    </div>
  );
}
