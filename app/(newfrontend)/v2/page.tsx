"use client";

import React, { useState, useEffect } from "react";
import Hero from "@/app/components/Hero";
import PrayerTimeSection from "@/app/components/PrayerTimeSection";
import Banner from "@/app/components/Banner";
import Footer from "@/app/components/Footer";
import HOME_CONTENT from "../../../content/home";
import IMG from "../../../content/img";
import HeroText from "@/app/components/HeroText";
import FeatureGrid2x2 from "@/app/components/FeatureGrid2x2";
import MASJID from "../../../content/masjid";
import Text from "@/app/components/Text";
import SecondaryButton from "@/app/components/SecondaryButton";
import FeatureButtonList from "@/app/components/FeatureButtonList";
import PrimaryButton from "@/app/components/PrimaryButton";
import { useRouter } from "next/navigation";
import Topbar from "@/app/components/Topbar";

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const route = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Topbar */}
      <Topbar
        onLoginClick={() => {
          route.push("/v2/login");
        }}
        logoSrc={IMG.LOGO}
        isScrolled={scrolled}
      />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero */}
        <Hero backgroundImage={IMG.HERO}>
          <HeroText> {HOME_CONTENT.HERO_TEXT} </HeroText>
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
          <Banner className=" text-nowrap">
            <Text className="font-semibold">{MASJID.NAMA}</Text>
            <div className="w-px bg-white h-full"></div>
            <Text className="font-semibold text-nowrap">{MASJID.ALAMAT}</Text>
            <div className="w-px bg-white h-full"></div>
            <SecondaryButton
              className="text-nowrap"
              onClick={() => {
                window.open(MASJID.GMAP, "_blank"); // buka tab baru
              }}
            >
              Lihat Selengkapnya
            </SecondaryButton>
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
