import React from "react";
import SectionTitle from "./SectionTitle";
import CurrentTimeDisplay from "./CurrentTimeDisplay";
import PrayerTimeGrid from "./PrayerTimeGrid";
import PrayerTimeItem from "./PrayerTimeItem";
import useCurrentTime from "../hooks/useCurrentTime";
import usePrayerSchedule from "../hooks/usePrayerSchedule";
import usePrayerCountdown from "../hooks/usePrayerCountdown";
import IMG from "@/content/img";

interface PrayerTimeSectionProps {
  title: string;
  date: string;
  hijri: string;
}

const PrayerTimeSection: React.FC<PrayerTimeSectionProps> = ({
  title,
  date,
  hijri,
}) => {
  const schedule = usePrayerSchedule("0711"); // Jakarta
  const { formatted: currentTime } = useCurrentTime();

  const prayers = schedule
    ? [
        {
          name: "Subuh",
          time: schedule.subuh,
          icon: `${IMG.ICON_JADWAL_SHOLAT}`,
        },
        {
          name: "Dhuha",
          time: schedule.dhuha,
          icon: `${IMG.ICON_JADWAL_SHOLAT}`,
        },
        {
          name: "Dzuhur",
          time: schedule.dzuhur,
          icon: `${IMG.ICON_JADWAL_SHOLAT}`,
        },
        {
          name: "Ashar",
          time: schedule.ashar,
          icon: `${IMG.ICON_JADWAL_SHOLAT}`,
        },
        {
          name: "Maghrib",
          time: schedule.maghrib,
          icon: `${IMG.ICON_JADWAL_SHOLAT}`,
        },
        {
          name: "Isya",
          time: schedule.isya,
          icon: `${IMG.ICON_JADWAL_SHOLAT}`,
        },
      ]
    : [];

  const activeIndex = prayers.findIndex((p, i) => {
    const now = parseInt(currentTime.replace(":", ""), 10);
    const t = parseInt(p.time.replace(":", ""), 10);
    const nextT = prayers[i + 1]
      ? parseInt(prayers[i + 1].time.replace(":", ""), 10)
      : 2400;
    return now >= t && now < nextT;
  });

  const nextPrayer = prayers[activeIndex + 1] || prayers[0];
  const countdown = usePrayerCountdown(nextPrayer?.time || "00:00");

  if (!schedule) {
    return (
      <section className="w-full px-6 py-10 text-center text-white">
        <SectionTitle title={title} />
        <p>Memuat jadwal sholat...</p>
      </section>
    );
  }

  return (
    <section className="w-full px-6 py-10 text-white">
      <SectionTitle title={title} />
      <CurrentTimeDisplay time={currentTime} date={date} hijri={hijri} />

      {nextPrayer && (
        <div className="text-center mt-4 text-xl text-white font-semibold">
          Menuju {nextPrayer.name}: {countdown}
        </div>
      )}

      <PrayerTimeGrid className="">
        {prayers.map((item, idx) => (
          <PrayerTimeItem
            key={idx}
            icon={item.icon}
            name={item.name}
            time={item.time}
            isActive={idx === activeIndex}
          />
        ))}
      </PrayerTimeGrid>
    </section>
  );
};

export default PrayerTimeSection;
