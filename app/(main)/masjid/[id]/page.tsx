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
import LineGraph from "@/app/(admin)/dashboard/_components/lineGraph";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchReport } from "@/action/dashboardAction";

export default function MosqueDetail () {
  const params = useParams();
  const [masjidId, setMasjidId] = useState<string>();
  const {report, loading} = useAppSelector((state) => state.dashboard);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(params?.id) {
      setMasjidId(params.id as string);
    }
  }, [params]);

  const init = async () => {
    if(!loading && masjidId && !report) {
      dispatch(fetchReport(masjidId));
    }
  }
  
  useEffect(() => {
    init();
  }, [dispatch, masjidId, loading, report])

  if(masjidId && !loading && report)
    return (
      <div className="flex flex-col">
        <HeroSection masjidId={masjidId} />
        <div className="w-screen h-screen flex items-center justify-center xl:justify-between p-10 gap-5 xl:gap-10 max-xl:flex-col mt-5">
          <CalendarElement masjid_id={masjidId}/>
          <PrayerTimesSection masjidId={masjidId} />
        </div>
        <div className="w-screen h-[120vh] sm:h-screen flex flex-col items-center justify-center px-10 sm:px-24 lg:px-48 mt-5">
          <a href={`/masjid/${masjidId}/laporan`} className="justify-self-end self-end flex items-center justify-center text-yellow-500 underline underline-offset-2 h-1/4">
            Lihat Selengkapnya {">>"}
          </a>
          <div className="flex items-center justify-center w-full h-3/4">
            <LineGraph data={report} />
          </div>
        </div>
        <div className="w-screen h-screen flex flex-col gap-3 items-center justify-center px-10 sm:px-20 mt-5">
          <h1 className="font-bold text-2xl">Acara atau Kegiatan yang akan berlangsung</h1>
          <ListKegiatan masjid_id={masjidId} />
        </div>
        <div className="w-screen h-max min-h-screen flex flex-col gap-3 items-center justify-center px-10 sm:px-20 mt-5">
          <h1 className="font-bold text-2xl">Donasi yang dapat anda berikan</h1>
          <DonationList masjid_id={masjidId} />
        </div>
        <div className="w-screen h-max min-h-screen flex flex-col gap-3 items-center justify-center px-10 sm:px-20 mt-5">
          <h1 className="font-bold text-2xl">Konten seputar Masjid</h1>
          <ListKonten masjid_id={masjidId} />
        </div>
        <MosqueListSection />
        <Footer />
      </div>
    );
}