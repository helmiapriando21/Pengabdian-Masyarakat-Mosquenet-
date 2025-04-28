"use client"

import { useParams } from "next/navigation";
import CalendarElement from "../../_components/calendarElement";
import Footer from "../../_layouts/footer";
import HeroSection from "../../_layouts/heroSection";
import MosqueListSection from "../../_layouts/mosqueListSection";
import PrayerTimesSection from "../../_layouts/prayerTimesSection";
import { useEffect, useState } from "react";
import ListKegiatan from "../../_components/listKegiatan";
import DonationList from "../../_components/donationList";
import ListKonten from "../../_components/listKonten";

export default function MosqueDetail () {
  const params = useParams();
  const [masjidId, setMasjidId] = useState<string>();

  useEffect(() => {
    if(params?.id) {
      setMasjidId(params.id as string);
    }
  }, [params]);

  if(masjidId)
    return (
      <div className="flex flex-col">
        <HeroSection masjidId={masjidId} />
        <div className="w-screen h-screen flex items-center justify-center xl:justify-between p-10 gap-5 xl:gap-10 max-xl:flex-col mt-5">
          <CalendarElement masjid_id={masjidId}/>
          <PrayerTimesSection masjidId={masjidId} />
        </div>
        <div className="w-screen h-screen flex flex-col gap-3 items-center justify-center px-10 sm:px-20">
          <h1 className="font-bold text-2xl">Acara atau Kegiatan yang akan berlangsung</h1>
          <ListKegiatan masjid_id={masjidId} />
        </div>
        <div className="w-screen h-max min-h-screen flex flex-col gap-3 items-center justify-center px-10 sm:px-20">
          <h1 className="font-bold text-2xl">Donasi yang dapat anda berikan</h1>
          <DonationList masjid_id={masjidId} />
        </div>
        <div className="w-screen h-max min-h-screen flex flex-col gap-3 items-center justify-center px-10 sm:px-20">
          <h1 className="font-bold text-2xl">Konten seputar Masjid</h1>
          <ListKonten masjid_id={masjidId} />
        </div>
        <MosqueListSection />
        <Footer />
      </div>
    );
}