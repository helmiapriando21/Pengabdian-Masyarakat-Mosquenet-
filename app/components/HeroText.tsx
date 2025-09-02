import React from "react";
import Text from "./Text";

interface HeroTextProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const HeroText: React.FC<HeroTextProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`inline-block rounded-[5px] px-[74px] py-[3px] w-[900px] shadow-hero ${className}`}
      style={{
        backgroundColor: "rgba(157, 157, 157, 0.25)",
      }}
      {...props}
    >
      <Text type="header1" className="text-primary text-center">
        {children}
      </Text>
    </div>
  );
};

export default HeroText;
