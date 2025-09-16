"use client";

import checkUser from "@/services/checkUser";
import Footer from "../../_layouts/footer";
import HeroSection from "./../../_layouts/heroSection";
import MosqueListSection from "./../../_layouts/mosqueListSection";
import PrayerTimesSection from "./../../_layouts/prayerTimesSection";
import DescribeSection from "./../../_layouts/describeSection";
import CalendarElement from "./../../_components/calendarElement";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import CardNavigation from "./../../_components/cardNavigation";
import Topbar from "../../../components/Topbar";
import IMG from "@/content/img";
import Hero from "../../../components/Hero";
import HOME_CONTENT from "@/content/home";
import MASJID from "@/content/masjid";
import Banner from "../../../components/Banner";
import FeatureButtonList from "../../../components/FeatureButtonList";
import FeatureGrid2x2 from "../../../components/FeatureGrid2x2";
import HeroText from "../../../components/HeroText";
import PrayerTimeSection from "../../../components/PrayerTimeSection";
import PrimaryButton from "../../../components/PrimaryButton";
import SecondaryButton from "../../../components/SecondaryButton";
import Text from "@/app/components/Text";
import { fetchMosques } from "@/action/mosqueAction";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ListMosque } from "@/interface/mosque";
import { table } from "console";
import DataCard from "@/app/components/DataCard";
import { fetchDashboard, fetchReport } from "@/action/dashboardAction";
import { ReportData } from "@/interface/report";

export default function Home() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [role, setRole] = useState<string>();
  const route = useRouter();
  const dashboard = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    if (params?.id && !dashboard.report) {
      dispatch(fetchReport(params?.id as string));
    } else console.log(dashboard.report);
  }, [dispatch, dashboard]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

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

  if (!loading && dashboard.report)
    return (
      <div className="min-h-screen flex flex-col">
        {/* Main Content */}
        <main className="flex-grow">
          {/* Hero */}
          <Hero backgroundImage={IMG.HERO}>
            <HeroText> {HOME_CONTENT.HERO_TEXT}</HeroText>
          </Hero>

          <div className="flex flex-col md:flex-row justify-center gap-12 mb-8 mt-8">
            <DataCard
              label="Total Pemasukan"
              value={formatCurrency(
                dashboard.report
                  .filter((r: ReportData) => r.type === "Pemasukan")
                  .reduce((sum: number, r: ReportData) => sum + r.amount, 0)
              )}
              className="bg-green-50 border-green-200"
              labelClassName="text-green-800"
              valueClassName="text-green-600"
            />

            <DataCard
              label="Total Pengeluaran"
              value={formatCurrency(
                dashboard.report
                  .filter((r: ReportData) => r.type === "Pengeluaran")
                  .reduce((sum: number, r: ReportData) => sum + r.amount, 0)
              )}
              className="bg-red-50 border-red-200"
              labelClassName="text-red-800"
              valueClassName="text-red-600"
            />

            <DataCard
              label="Saldo Total"
              value={formatCurrency(
                dashboard.report
                  .filter((r: ReportData) => r.type === "Pemasukan")
                  .reduce((sum: number, r: ReportData) => sum + r.amount, 0) -
                  dashboard.report
                    .filter((r: ReportData) => r.type === "Pengeluaran")
                    .reduce((sum: number, r: ReportData) => sum + r.amount, 0)
              )}
              className="bg-blue-50 border-blue-200"
              labelClassName="text-blue-800"
              valueClassName="text-blue-600 text-4xl"
            />
          </div>

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
