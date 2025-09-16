"use client";

import checkUser from "@/services/checkUser";
import Footer from "@/app/components/Footer";
import HeroSection from "./_layouts/heroSection";
import MosqueListSection from "./_layouts/mosqueListSection";
import PrayerTimesSection from "./_layouts/prayerTimesSection";
import DescribeSection from "./_layouts/describeSection";
import CalendarElement from "./_components/calendarElement";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CardNavigation from "./_components/cardNavigation";
import Topbar from "../components/Topbar";
import IMG from "@/content/img";
import Hero from "../components/Hero";
import HOME_CONTENT from "@/content/home";
import MASJID from "@/content/masjid";
import Banner from "../components/Banner";
import FeatureButtonList from "../components/FeatureButtonList";
import FeatureGrid2x2 from "../components/FeatureGrid2x2";
import HeroText from "../components/HeroText";
import PrayerTimeSection from "../components/PrayerTimeSection";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import Text from "@/app/components/Text";
import { fetchMosques } from "@/action/mosqueAction";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ListMosque } from "@/interface/mosque";
import { table } from "console";

export default function Home() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [role, setRole] = useState<string>();
  const route = useRouter();

  const dispatch = useAppDispatch();
  const { mosques, loading } = useAppSelector((state) => state.mosque);

  useEffect(() => {
    if (!loading && !mosques) dispatch(fetchMosques("/api/mosques/list"));
  }, [dispatch, loading, mosques]);

  useEffect(() => {
    init();
  }, [isLogin]);

  const init = async () => {
    await checkUser(setRole, setIsLogin);
    setIsLoading(false);
  };

  if (!isLoading)
    return (
      <div className="min-h-screen flex flex-col">
        {/* Main Content */}
        <main className="flex-grow">
          {/* Hero */}
          <Hero backgroundImage={IMG.HERO}>
            <HeroText> {HOME_CONTENT.HERO_TEXT}</HeroText>
          </Hero>

          {/* Fitur Grid 2x2 */}
          <FeatureGrid2x2
            img1={IMG.FEATURE_GRID_1}
            img2={IMG.FEATURE_GRID_2}
            text1={HOME_CONTENT.FITUR_GRID_1}
            text2={HOME_CONTENT.FITUR_GRID_2}
          />

          {/* Jadwal Sholat */}
          <section
            className="relative py-16"
            style={{
              backgroundImage: `url(${IMG.BG_FEATURE_JADWAL_SHOLAT})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <PrayerTimeSection
              title={HOME_CONTENT.JADWAL_SHOLAT_TITLE + ` (${MASJID.NAMA})`}
              date={new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              hijri="17 Muharram 1447 H" // Bisa diganti dinamis juga
            />
          </section>

          <section className="py-8 flex flex-col gap-8">
            {/* Banner */}
            <Banner className=" text-nowrap flex flex-col !h-max !gap-0">
              <table>
                <tbody>
                  {mosques &&
                    mosques.map((value: ListMosque, index: number) => (
                      <tr key={index}>
                        <td className="border-r-[1px] border-white px-6 py-3">
                          {value.name}
                        </td>
                        <td className="border-r-[1px] border-white px-6 py-3">
                          {value.location}
                        </td>
                        <td className="px-6 py-3">
                          <SecondaryButton
                            className="text-nowrap"
                            onClick={() => {
                              // window.open(MASJID.GMAP, "_blank"); // buka tab baru
                              route.push(`/masjid/${value.id}`);
                            }}
                          >
                            Lihat Selengkapnya
                          </SecondaryButton>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </Banner>

            {/* List Button Fitur */}
            <FeatureButtonList>
              {HOME_CONTENT.FEATURE_LIST.map((feature, index) => (
                <PrimaryButton
                  className="py-5 px-5"
                  key={index}
                  onClick={() => route.push(feature.url)}
                >
                  {feature.title}
                </PrimaryButton>
              ))}
            </FeatureButtonList>
          </section>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    );
}
