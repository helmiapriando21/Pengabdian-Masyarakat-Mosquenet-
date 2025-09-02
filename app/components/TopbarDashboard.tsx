"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import PrimaryButton from "./PrimaryButton";
import { useRouter, usePathname } from "next/navigation";
import colors from "@/const/colors";
import { IoPersonCircleOutline, IoChevronDown } from "react-icons/io5";

interface Submenu {
  title: string;
  url: string;
}

interface Feature {
  title: string;
  url: string;
  submenus?: readonly Submenu[];
}

interface TopbarDashboardProps {
  logoSrc?: string;
  onLoginClick?: () => void;
  className?: string;
  features?: readonly Feature[];
  showFeatures?: boolean;
}

const TopbarDashboard: React.FC<TopbarDashboardProps> = ({
  logoSrc = "/img/logo-white.png",
  onLoginClick,
  className = "",
  features = [],
  showFeatures = true,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdownIndex(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdownIndex(null), 150); // Delay sedikit
  };

  return (
    <header
      className={`sticky top-0 w-full flex items-center justify-between px-6 py-4 z-50 ${className}`}
      style={{ backgroundColor: colors.primary }}
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

      {/* Features */}
      {showFeatures && features.length > 0 && (
        <nav className="flex space-x-8 mx-auto relative z-50">
          {features.map(({ title, url, submenus }, idx) => {
            const isActive = pathname.startsWith(url);
            const isDropdownOpen = openDropdownIndex === idx;

            return (
              <div
                key={idx}
                className="relative"
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`flex items-center gap-1 text-lg font-medium transition cursor-pointer ${
                    isActive
                      ? "text-white opacity-100"
                      : "text-white opacity-60 hover:opacity-90"
                  }`}
                  onClick={() => {
                    if (!submenus) router.push(url);
                  }}
                  type="button"
                >
                  {title}
                  {submenus && (
                    <IoChevronDown
                      className={`transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180" : "rotate-0"
                      }`}
                      size={16}
                    />
                  )}
                </button>

                {submenus && isDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-52 bg-white rounded shadow-lg z-50 py-1">
                    {submenus.map((submenu, subIdx) => {
                      const isSubActive = pathname.startsWith(submenu.url);
                      return (
                        <button
                          key={subIdx}
                          className={`w-full text-left px-4 py-2 text-sm cursor-pointer ${
                            isSubActive
                              ? "bg-gray-100 text-blue-600"
                              : "hover:bg-gray-100 text-gray-800"
                          }`}
                          onClick={() => router.push(submenu.url)}
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

      {/* Login/Register */}
      <PrimaryButton onClick={onLoginClick}>
        <IoPersonCircleOutline size={50} />
      </PrimaryButton>
    </header>
  );
};

export default TopbarDashboard;
