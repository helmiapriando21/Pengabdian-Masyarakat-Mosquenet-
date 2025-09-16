"use client";

import { useEffect, useState } from "react";
import Logo from "./logo";
import { useRouter, usePathname } from "next/navigation";
import showAlert from "@/services/showAlert";
import checkUser from "@/services/checkUser";
import Topbar from "./Topbar";
import IMG from "@/content/img";
import DASHBOARD_CONTENT from "@/content/dashboard";
import TopbarDashboard from "./TopbarDashboard";
import { fetchConfiguration } from "@/action/configurationAction";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [role, setRole] = useState<string>();
  const [login, setIsLogin] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { configuration, loading } = useAppSelector((state) => state.config);

  useEffect(() => {
    checkUser(setRole, setIsLogin);

    const handleUserUpdated = () => {
      checkUser(setRole, setIsLogin);
    };

    window.addEventListener("user-updated", handleUserUpdated);

    return () => {
      window.removeEventListener("user-updated", handleUserUpdated);
    };
  }, []);

  useEffect(() => {
    if (!loading && !configuration && pathname.startsWith("dashboard"))
      dispatch(fetchConfiguration());
  }, [configuration, loading]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    console.log();
  }, []);

  if (pathname.startsWith("/dashboard"))
    return (
      <TopbarDashboard
        logoSrc={IMG.LOGO_WHITE}
        onLoginClick={() => {
          router.push("/profile");
        }}
        features={[
          ...DASHBOARD_CONTENT.FEATURE_LIST.filter((value) => {
            return (
              value.title !== "Manajemen Sistem" &&
              value.title !== "Manajemen Keuangan"
            );
          }),
          ...(role === "Ketua"
            ? DASHBOARD_CONTENT.FEATURE_LIST.filter((value) => {
                return value.title === "Manajemen Sistem";
              })
            : role === "Bendahara"
            ? DASHBOARD_CONTENT.FEATURE_LIST.filter((value) => {
                return value.title === "Manajemen Keuangan";
              })
            : []),
        ]}
        showFeatures={true}
      />
    );
  else
    return (
      <Topbar
        onLoginClick={() => {
          router.push("/auth/login");
        }}
        logoSrc={IMG.LOGO}
        isScrolled={scrolled}
      />
    );
}
