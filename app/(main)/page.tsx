"use client"

import checkUser from "@/services/checkUser";
import Footer from "./_layouts/footer";
import HeroSection from "./_layouts/heroSection";
import MosqueListSection from "./_layouts/mosqueListSection";
import PrayerTimesSection from "./_layouts/prayerTimesSection";
import DescribeSection from "./_layouts/describeSection";
import CalendarElement from "./_components/calendarElement";
import { useState, useEffect } from 'react';
import { getDashboardData } from "@/services/getData";
import LineGraph from "../(admin)/dashboard/_components/lineGraph";
import ListKegiatan from "./_components/listKegiatan";
import { ReportData } from "@/interface/report";
import { useRouter } from 'next/navigation';
import CardNavigation from "./_components/cardNavigation";
import ListKonten from "./_components/listKonten";

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
            && <div className="w-screen h-screen flex items-center justify-center xl:justify-between p-10 gap-5 xl:gap-10 max-xl:flex-col mt-5">
              <CalendarElement masjid_id={null} />
              <PrayerTimesSection />
            </div>
        }
        {
          isLogin && report &&
          <div className="w-screen h-[120vh] sm:h-screen flex flex-col items-center justify-center px-10 sm:px-24 lg:px-48 mt-5">
            <a href="/laporan" className="justify-self-end self-end flex items-center justify-center text-yellow-500 underline underline-offset-2 h-1/4">
              Lihat Selengkapnya {">>"}
            </a>
            <div className="flex items-center justify-center w-full h-3/4">
              <LineGraph data={report} />
            </div>
          </div>
        }
        {
          isLogin &&
          <div className="w-screen h-screen flex flex-col gap-3 items-center justify-center px-10 sm:px-20">
            <h1 className="font-bold text-2xl">Acara atau Kegiatan yang akan berlangsung</h1>
            <ListKegiatan masjid_id={null} />
          </div>
        }
        {
          isLogin &&
          <div className="w-screen h-screen flex flex-col gap-3 items-center justify-center px-10 sm:px-20">
            <h1 className="font-bold text-2xl">Konten seputar Masjid</h1>
            <ListKonten masjid_id={null} />
          </div>
        }
        <div className="flex max-sm:flex-col sm:w-full h-screen max-sm:p-14 sm:h-40 items-center justify-center mb-20 gap-5 sm:gap-3">
          <CardNavigation
            action={() => {
              router.push('/muratal-al-quran');
            }}
            label="Muratal"
          />
          <CardNavigation 
            action={() => {
              router.push('/messages-to-developer');
            }}
            label="Kritik dan Saran Pengembangan Website"
          />
          <CardNavigation
            action={() => {
              router.push('/calc-zakat')
            }}
            label="Kalkulator Zakat"
          />
        </div>
        <Footer />
      </div>
    );
}
