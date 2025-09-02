"use client";

import React from "react";
import Image from "next/image";
import PrimaryButton from "./PrimaryButton";
import { useRouter, usePathname } from "next/navigation";

interface Feature {
  title: string;
  description?: string;
  url: string;
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

  // Cari fitur yang aktif dari url saat ini
  const activeFeature = React.useMemo(() => {
    if (!pathname) return null;

    // Sort fitur berdasarkan panjang url desc
    const sortedFeatures = [...features].sort(
      (a, b) => b.url.length - a.url.length
    );

    return (
      sortedFeatures.find((feature) => pathname.startsWith(feature.url))
        ?.title ?? null
    );
  }, [pathname, features]);

  return (
    <header
      className={`sticky top-0 w-full flex items-center justify-between px-6 py-4 transition-colors duration-300 z-50 ${
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

      {/* Features List (Center) */}
      {showFeatures && features.length > 0 && (
        <nav className="flex space-x-8 mx-auto">
          {features.map(({ title, url }, idx) => {
            const isActive = activeFeature === title;

            return (
              <button
                key={idx}
                className={`text-lg font-medium transition cursor-pointer ${
                  isActive
                    ? "text-black opacity-100"
                    : "text-black opacity-60 hover:text-green-600"
                }`}
                onClick={() => router.push(url)}
                type="button"
              >
                {title}
              </button>
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
