"use client";

import React from "react";
import Image from "next/image";
import PrimaryButton from "./PrimaryButton";
import { useRouter, usePathname } from "next/navigation";

interface Submenu {
  title: string;
  url: string;
}

interface Feature {
  title: string;
  url: string;
  submenus?: readonly Submenu[];
}

interface TopbarProps {
  logoSrc?: string;
  onLoginClick?: () => void;
  isScrolled: boolean;
  className?: string;
  features?: readonly Feature[];
  showFeatures?: boolean;
}

const Topbar: React.FC<TopbarProps> = ({
  logoSrc = "/img/logo.svg",
  onLoginClick,
  isScrolled,
  className = "",
  features = [],
  showFeatures = true,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

  // Fungsi helper untuk pecah path jadi array segmen
  const splitPath = (path: string) =>
    path.replace(/\/+$/, "").split("/").filter(Boolean);

  const getActiveFeatureUrl = React.useMemo(() => {
    if (!pathname) return null;

    const currentSegments = splitPath(pathname);

    // Cari menu / submenu yang paling cocok
    let matchUrl: string | null = null;
    let maxMatchLength = 0;

    features.forEach((feature) => {
      // Cek fitur utama
      if (feature.url) {
        const featureSegments = splitPath(feature.url);
        if (
          featureSegments.every((seg, i) => currentSegments[i] === seg) &&
          featureSegments.length > maxMatchLength
        ) {
          matchUrl = feature.url;
          maxMatchLength = featureSegments.length;
        }
      }

      // Cek submenu jika ada
      if (feature.submenus) {
        feature.submenus.forEach((submenu) => {
          const subSegments = splitPath(submenu.url);
          if (
            subSegments.every((seg, i) => currentSegments[i] === seg) &&
            subSegments.length > maxMatchLength
          ) {
            matchUrl = submenu.url;
            maxMatchLength = subSegments.length;
          }
        });
      }
    });

    return matchUrl;
  }, [pathname, features]);

  const isFeatureActive = (feature: Feature): boolean => {
    if (!getActiveFeatureUrl) return false;

    // Jika feature memiliki URL dan URL aktif sama dengan URL feature
    if (feature.url && getActiveFeatureUrl === feature.url) return true;

    // Jika feature memiliki submenu, cek apakah ada submenu yang aktif
    if (feature.submenus) {
      return feature.submenus.some(
        (submenu) => submenu.url === getActiveFeatureUrl
      );
    }

    return false;
  };

  const isSubmenuActive = (submenuUrl: string): boolean => {
    return getActiveFeatureUrl === submenuUrl;
  };

  return (
    <header
      className={`fixed top-0 w-full flex items-center justify-between px-6 py-4 transition-colors duration-300 z-50  ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      } ${className}`}
    >
      {/* Logo */}
      <div className="relative w-[120px] h-[40px]">
        <Image
          src={logoSrc}
          alt="Logo"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </div>

      {/* Features List */}
      {showFeatures && features.length > 0 && (
        <nav className="flex space-x-8 mx-auto">
          {features.map((feature, idx) => {
            const active = isFeatureActive(feature);
            const hasSubmenus = feature.submenus && feature.submenus.length > 0;

            return (
              <div
                key={idx}
                className="relative group"
                onMouseEnter={() =>
                  hasSubmenus && setOpenDropdown(feature.title)
                }
                onMouseLeave={() => hasSubmenus && setOpenDropdown(null)}
              >
                {/* Parent Button */}
                <button
                  className={`text-lg font-medium transition cursor-pointer ${
                    active
                      ? "text-green-600 font-bold"
                      : "text-black opacity-60 hover:text-green-600"
                  }`}
                  onClick={() => {
                    if (feature.url) router.push(feature.url);
                  }}
                  type="button"
                >
                  {feature.title}
                </button>

                {/* Dropdown jika ada submenu */}
                {hasSubmenus && (
                  <div
                    className={`absolute bg-white shadow-lg rounded-md mt-2 min-w-[200px] ${
                      openDropdown === feature.title ? "block" : "hidden"
                    }`}
                  >
                    {feature.submenus!.map((submenu, i) => {
                      const submenuActive = isSubmenuActive(submenu.url);
                      return (
                        <button
                          key={i}
                          onClick={() => router.push(submenu.url)}
                          className={`block px-4 py-2 text-left w-full ${
                            submenuActive
                              ? "bg-green-100 text-green-700 font-semibold"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {submenu.title}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      )}

      {/* Login/Register Button */}
      <PrimaryButton onClick={onLoginClick}>Login / Register</PrimaryButton>
    </header>
  );
};

export default Topbar;
