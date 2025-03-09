"use client"

import checkUser from "@/helper/checkUser";
import Footer from "./_layouts/footer";
import HeroSection from "./_layouts/heroSection";
import MosqueListSection from "./_layouts/mosqueListSection";
import PrayerTimesSection from "./_layouts/prayerTimesSection";
import DescribeSection from "./_layouts/describeSection";
import CalendarElement from "./_components/calendarElement";
import { useState, useEffect } from 'react';
import { getDashboardData } from "@/helper/getData";
import LineGraph from "../(admin)/dashboard/_components/lineGraph";
import ListKegiatan from "./_components/listKegiatan";
import { ReportData } from "@/interface/report";
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [role, setRole] = useState<string>();
  const [report, setReport] = useState<ReportData[]>();
  const router = useRouter();

  useEffect(() => {
    init();
  }, [isLogin])

  const init = async () => {
    const check = await checkUser(setRole, setIsLogin);
    if(check.isLogin) {
      const data = await getDashboardData(setIsLoading);
      if(data) {
        setReport(data.report);
      }
    } else {
      setIsLoading(false);
    }
  }

  if(!isLoading)
    return (
      <div className="flex flex-col">
        <HeroSection />
        <DescribeSection />
        { !isLogin && <MosqueListSection /> }
        { 
          isLogin 
            && <div className="w-screen h-screen flex items-center justify-between p-10 gap-10 ">
              <CalendarElement masjid_id={null} />
              <PrayerTimesSection />
            </div>
        }
        {
          isLogin && report &&
          <div className="w-screen h-screen flex flex-col items-center justify-center px-48">
            <a href="/laporan" className="justify-self-end self-end flex items-center justify-center text-yellow-500 underline underline-offset-2">
              Lihat Selengkapnya {">>"}
            </a>
            <div className="flex items-center justify-center w-1/2 h-1/2">
              <LineGraph data={report} />
            </div>
          </div>
        }
        {
          isLogin &&
          <div className="w-screen h-screen flex flex-col gap-3 items-center justify-center px-20">
            <h1 className="font-bold text-2xl">Acara atau Kegiatan yang akan berlangsung</h1>
            <ListKegiatan masjid_id={null} />
          </div>
        }
        <Footer />
      </div>
    );
}
