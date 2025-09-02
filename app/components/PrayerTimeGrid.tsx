import React from "react";

interface PrayerTimeGridProps {
  children: React.ReactNode[];
  className?: string;
}

const PrayerTimeGrid: React.FC<PrayerTimeGridProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-y-[40px] justify-items-center mt-8 ${className}`}
    >
      {children}
    </div>
  );
};

export default PrayerTimeGrid;
