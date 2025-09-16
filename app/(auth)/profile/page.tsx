"use client";

import IMG from "@/content/img";
import checkUser from "@/services/checkUser";
import showAlert from "@/services/showAlert";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [role, setRole] = useState<string>();

  const handleLogout = async () => {
    if (isLogin) {
      const response = await fetch("/api/logout", { method: "POST" });
      if (response.ok) {
        const { message } = await response.json();
        showAlert(message, router, "success", "/auth/login");
      } else {
        const { error } = await response.json();
        showAlert(error, router, "error", "/");
      }
    }
  };

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

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background */}
      <Image
        src={IMG.BG_PROFILE}
        alt="Masjid Background"
        fill
        className="object-cover -z-10"
        priority
      />

      {/* Card Profil */}
      <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 flex flex-col items-center space-y-4">
        {/* Content */}
        <div className="flex flex-col h-full items-center justify-center gap-4">
          {/* Back Button */}
          <button
            className="self-start text-gray-700 text-2xl"
            onClick={() => router.back()}
          >
            ←
          </button>

          {/* Logo */}
          <Image src={IMG.LOGO} alt="Logo" width={310} height={75} />

          {/* Title */}
          <h1 className="text-3xl font-semibold">Profile</h1>

          {/* Foto Profil */}
          <div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-300">
            <Image
              src="/img/avatar.jpeg"
              alt="Foto Profil"
              width={96}
              height={96}
              className="object-cover"
            />
          </div>

          {/* Nama & Role */}
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900">
              Abdullah Ahmad Hafiz
            </p>
            <p className="text-gray-600">Takmir - Masjid Al-Ihsan</p>
          </div>

          {/* Tombol Logout */}
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-semibold transition-colors w-full"
          >
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
}
