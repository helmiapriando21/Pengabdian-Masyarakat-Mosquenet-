import React from "react";
import Text from "./Text";

interface SectionTitleProps {
  title: string;
  lineWidth?: string; // contoh: '20%', '100px'
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  lineWidth = "25%",
  className = "",
}) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <Text type="header1" className="mb-2">
        {title}
      </Text>
      <div
        style={{
          width: lineWidth,
          height: "2px",
          backgroundColor: "#fff",
        }}
      />
    </div>
  );
};

export default SectionTitle;
