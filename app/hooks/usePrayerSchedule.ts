import { useEffect, useState } from "react";

interface PrayerSchedule {
  subuh: string;
  dhuha: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
}

export default function usePrayerSchedule(kodeKota: string) {
  const [schedule, setSchedule] = useState<PrayerSchedule | null>(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await fetch(
          `https://api.myquran.com/v1/sholat/jadwal/${kodeKota}/today`
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        const jadwal = data?.data?.jadwal;

        if (!jadwal) throw new Error("Jadwal not found");

        setSchedule({
          subuh: jadwal.subuh,
          dhuha: jadwal.dhuha,
          dzuhur: jadwal.dzuhur,
          ashar: jadwal.ashar,
          maghrib: jadwal.maghrib,
          isya: jadwal.isya,
        });
      } catch (err) {
        console.error("Gagal fetch jadwal dari API:", err);

        // ✅ Tambahkan fallback saat development
        if (process.env.NODE_ENV === "development") {
          console.warn("Memuat jadwal dummy karena mode development.");
          setSchedule({
            subuh: "04:30",
            dhuha: "06:00",
            dzuhur: "11:45",
            ashar: "15:15",
            maghrib: "17:55",
            isya: "19:10",
          });
        } else {
          setSchedule(null);
        }
      }
    };

    fetchSchedule();
  }, [kodeKota]);

  return schedule;
}
