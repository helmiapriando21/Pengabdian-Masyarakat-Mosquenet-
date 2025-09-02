import React from "react";

interface SecondaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  className = "",
  ...rest
}) => {
  return (
    <button
      className={`rounded-[10px] cursor-pointer bg-white text-black px-[14px] py-[17px] font-medium hover:opacity-90 transition ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
