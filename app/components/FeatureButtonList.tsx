import React from "react";

interface FeatureButtonListProps {
  children: React.ReactNode[];
  className?: string;
}

const FeatureButtonList: React.FC<FeatureButtonListProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-wrap justify-center items-center gap-[22px] px-[20px] ${className}`}
    >
      {children.map((child, index) => (
        <div key={index}>{child}</div>
      ))}
    </div>
  );
};

export default FeatureButtonList;
