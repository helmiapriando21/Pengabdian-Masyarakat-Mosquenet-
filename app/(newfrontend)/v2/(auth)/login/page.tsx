"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import PrimaryButton from "@/app/components/PrimaryButton";
import IMG from "@/content/img";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const route = useRouter();

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${IMG.BG_LOGIN})`,
      }}
    >
      <div className="bg-white w-[600px] h-[600px] rounded-[10px] p-5 relative shadow-lg">
        {/* Back Button */}
        <Link
          href="/v2"
          className="absolute top-5 left-5 text-2xl font-bold text-gray-700 hover:text-black"
        >
          <FaChevronLeft />
        </Link>

        {/* Content */}
        <div className="flex flex-col h-full items-center justify-center gap-4">
          {/* Logo */}
          <Image src={IMG.LOGO} alt="Logo" width={310} height={75} />

          {/* Title */}
          <h1 className="text-3xl font-semibold">Login</h1>

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="w-full max-w-[400px] border border-gray-300 rounded px-4 py-2"
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            className="w-full max-w-[400px] border border-gray-300 rounded px-4 py-2"
          />

          {/* Lupa password */}
          <div className="w-full max-w-[400px] text-right text-sm">
            Lupa password?{" "}
            <Link
              className="text-blue-600 hover:underline cursor-pointer"
              href={"/v2/forget-password"}
            >
              Klik di sini!
            </Link>
          </div>

          {/* Login Button */}
          <PrimaryButton
            className="w-full max-w-[400px]"
            onClick={() => {
              route.push("/v2/dashboard");
            }}
          >
            Login
          </PrimaryButton>

          {/* Belum punya akun */}
          <div className="text-sm text-gray-600">
            Belum punya akun?{" "}
            <Link href="/v2/register" className="text-blue-600 hover:underline">
              Daftar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
