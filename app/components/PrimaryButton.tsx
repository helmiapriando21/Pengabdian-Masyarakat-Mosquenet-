// components/PrimaryButton.tsx
import React from "react";
import Button from "./Button";
import colors from "@/const/colors";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <Button
      variant="default"
      className={`text-white rounded-[10px] cursor-pointer hover:opacity-80 transition-opacity ${className}`}
      style={{ backgroundColor: `${colors.primary}` }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
