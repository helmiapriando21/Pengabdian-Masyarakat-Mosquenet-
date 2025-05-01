"use client"

import { getMasjid, getPrayerTimes } from "@/services/getData";
import React, { useEffect, useState } from "react";
import PrayerTimesItem from "../_components/prayerTimesItem";
import ClockElement from "../_components/clockElement";
import { PrayerTimes } from "@/interface/prayerTimes";

interface PrayerTimesSectionProps {
  masjidId?: string
};

export default function PrayerTimesSection({ masjidId }: PrayerTimesSectionProps) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [prayerTimes, setPrayerTimes] = useState<PrayerTimes>();
    
    useEffect(() => {
        const init = async () => {
            const data = await getMasjid(null, masjidId || null);
            const today = new Date();

            const formattedDate = today.toLocaleDateString(
              'id-ID', 
              {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
              }
            ).replace(
              /\//g, 
              '-'
            );

            const prayerTimes = await getPrayerTimes(
                setIsLoading, 
                formattedDate, 
                data.mosque.province
            );
            
            setPrayerTimes(prayerTimes);
        }
        if(isLoading) 
            init();
    }, [masjidId]);

    if(!isLoading && prayerTimes) 
        return (
        <div className="flex flex-col gap-1 sm:gap-10 items-center justify-center bg-[#FFE98C] px-[0.9rem] py-3">
            <div className="flex items-center justify-center gap-3 sm:gap-10">
                <PrayerTimesItem label="Imsak" value={prayerTimes.Imsak} after={prayerTimes.Fajr} />
                <PrayerTimesItem label="Subuh" value={prayerTimes.Fajr} after={prayerTimes.Dhuhr} />
                <PrayerTimesItem label="Zuhur" value={prayerTimes.Dhuhr} after={prayerTimes.Asr} />
                <PrayerTimesItem label="Asar" value={prayerTimes.Asr} after={prayerTimes.Maghrib} />
                <PrayerTimesItem label="Magrib" value={prayerTimes.Maghrib} after={prayerTimes.Isha} />
                <PrayerTimesItem label="Isya" value={prayerTimes.Isha} after={prayerTimes.Imsak} />
            </div>
            <ClockElement />
        </div>
    );
}