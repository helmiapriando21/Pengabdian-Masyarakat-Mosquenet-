import React, { ReactNode } from "react";

interface GraphContainerProps {
  children: ReactNode;
  className?: string;
}

const GraphContainer = ({ children, className = "" }: GraphContainerProps) => {
  const baseStyles = `
    rounded-[10px]
    bg-white
    border border-opacity-25 border-gray-200 
    shadow-[0_10px_10px_0_rgba(0,0,0,0.25)]
    px-[20px]
    py-[35px]
    flex
    justify-center
    items-center
    w-full
  `;

  return <div className={`${baseStyles} ${className}`}>{children}</div>;
};

export default GraphContainer;
