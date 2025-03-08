"use client"

import { useState, useEffect } from "react";

interface PrayerTimesItemsProps {
  label: string,
  value: string,
  after: string
};

export default function PrayerTimesItem({label, value, after}: PrayerTimesItemsProps) {
  const [isTime, setIsTime] = useState<boolean>(false);

  useEffect(() => {
    if(
      (
        (
          new Date().getHours() == Number(value.split(":")[0]) &&
          new Date().getMinutes() >= Number(value.split(":")[1])
        ) || new Date().getHours() > Number(value.split(":")[0])
      ) 
        &&
      (
        (
          new Date().getHours() == Number(after.split(":")[0]) &&
          new Date().getMinutes() <= Number(value.split(":")[1])
        ) || new Date().getHours() < Number(after.split(":")[0])
      )
    ) {
      setIsTime(true);
    } else if (
      Number(value.split(":")[0]) > Number(after.split(":")[0]) &&
      (
        (
          (
            new Date().getHours() == Number(value.split(":")[0]) &&
            new Date().getMinutes() > Number(value.split(":")[1])
          ) || new Date().getHours() > Number(value.split(":")[0])
        ) 
          ||
        (
          (
            new Date().getHours() == Number(after.split(":")[0]) &&
            new Date().getMinutes() < Number(after.split(":")[1])
          ) || new Date().getHours() < Number(after.split(":")[0])
        )
      )
    ){
      setIsTime(true);
    }
  }, []);

    return <div className={`flex flex-col gap-4 items-center justify-center text-center font-bold text-2xl ${isTime ? "bg-green-400 p-3 rounded-xl" : ""}`}>
      <label htmlFor={label}>{label}</label>
      <p id={label}>{value}</p>
    </div>
}