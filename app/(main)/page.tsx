"use client"

import checkUser from "@/services/checkUser";
import Footer from "./_layouts/footer";
import HeroSection from "./_layouts/heroSection";
import MosqueListSection from "./_layouts/mosqueListSection";
import PrayerTimesSection from "./_layouts/prayerTimesSection";
import DescribeSection from "./_layouts/describeSection";
import CalendarElement from "./_components/calendarElement";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CardNavigation from "./_components/cardNavigation";

export default function Home() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [role, setRole] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    init();
  }, [isLogin])

  const init = async () => {
    await checkUser(setRole, setIsLogin);
    setIsLoading(false);
  }

  if(!isLoading)
    return (
      <div className="flex flex-col">
        <HeroSection />
        <DescribeSection />
        { 
          isLogin 
            && <div className="w-screen h-screen flex items-center justify-center xl:justify-between p-10 gap-5 xl:gap-10 max-xl:flex-col mt-5">
              <CalendarElement masjid_id={null} />
              <PrayerTimesSection />
            </div>
        }
        <MosqueListSection />
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
