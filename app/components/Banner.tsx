import colors from "@/const/colors";
import React from "react";

interface BannerProps {
  children: React.ReactNode | React.ReactNode[];
  height?: number | string;
  className?: string;
}

const Banner: React.FC<BannerProps> = ({
  children,
  height = 100,
  className = "",
}) => {
  const childArray = React.Children.toArray(children);

  return (
    <div
      className={`relative flex justify-between gap-5 items-stretch rounded-[25px] py-[17px] w-fit mx-auto px-6 ${className}`}
      style={{
        backgroundColor: colors.primary,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    >
      {childArray.map((child, index) => (
        <div
          key={index}
          className="flex-1 flex items-center justify-center text-white"
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default Banner;
