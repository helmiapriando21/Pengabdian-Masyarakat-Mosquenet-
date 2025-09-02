import React from "react";

interface DataCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  labelClassName?: string;
  valueClassName?: string;
}

const DataCard: React.FC<DataCardProps> = ({
  label,
  value,
  className = "",
  labelClassName = "",
  valueClassName = "",
  ...props
}) => {
  // Base styles
  const baseStyles = `
    rounded-[10px] bg-white border border-black border-opacity-25
    shadow-[0_10px_10px_0_rgba(0,0,0,0.25)]
    w-[400px] h-[200px] p-[12px]
    flex flex-col justify-center items-center
  `;

  const baseLabelStyles = "font-bold text-2xl text-black mb-2";
  const baseValueStyles = "font-bold text-3xl text-black";

  return (
    <div {...props} className={`${baseStyles} ${className}`}>
      <div className={`${baseLabelStyles} ${labelClassName}`}>{label}</div>
      <div className={`${baseValueStyles} ${valueClassName}`}>{value}</div>
    </div>
  );
};

export default DataCard;
