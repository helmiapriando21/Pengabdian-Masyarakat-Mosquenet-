import React from "react";
import Text from "./Text";
import Image from "next/image";

interface PrayerTimeItemProps {
  icon: string;
  name: string;
  time: string;
  isActive?: boolean;
}

const PrayerTimeItem: React.FC<PrayerTimeItemProps> = ({
  icon,
  name,
  time,
  isActive = false,
}) => {
  return (
    <div
      className={`flex flex-col items-center gap-[15px] p-4 rounded-lg transition ${
        isActive ? "bg-white/20 text-white scale-105 shadow-lg" : ""
      }`}
    >
      <Image src={icon} alt={name} width={50} height={50} />
      <Text type="paragraph" className="text-[40px] font-normal">
        {name}
      </Text>
      <Text type="paragraph" className="text-[40px] font-normal">
        {time}
      </Text>
    </div>
  );
};

export default PrayerTimeItem;
