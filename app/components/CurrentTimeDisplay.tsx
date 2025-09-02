import React from "react";
import Text from "./Text";

interface CurrentTimeDisplayProps {
  time: string;
  date: string;
  hijri: string;
}

const CurrentTimeDisplay: React.FC<CurrentTimeDisplayProps> = ({
  time,
  date,
  hijri,
}) => {
  return (
    <div className="text-center space-y-1 mt-6">
      <Text type="header1">{time}</Text>
      <Text type="paragraph" className="text-[30px] font-regular">
        {date}
      </Text>
      <Text type="paragraph" className="text-[22px] font-regular">
        {hijri}
      </Text>
    </div>
  );
};

export default CurrentTimeDisplay;
