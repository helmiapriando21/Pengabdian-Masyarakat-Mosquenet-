"use client";

import React from "react";
import Image from "next/image";
import PrimaryButton from "@/app/components/PrimaryButton";
import { FaChevronLeft } from "react-icons/fa6";
import IMG from "@/content/img";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${IMG.BG_LOGIN})` }} // ganti bg sesuai aset kamu
    >
      <div className="bg-white rounded-[10px] w-[600px] h-[600px] p-5 relative shadow-lg flex flex-col items-center justify-center gap-4">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute left-5 top-5 text-2xl font-bold text-gray-600 hover:text-black cursor-pointer"
        >
          <FaChevronLeft />
        </button>

        {/* Logo */}
        <Image src={IMG.LOGO} alt="Logo" width={310} height={75} />

        {/* Title */}
        <div className="text-3xl font-bold mb-4">Register</div>

        {/* Form */}
        <form className="w-full px-10 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nama"
            className="border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="tel"
            placeholder="Nomor Telepon"
            className="border border-gray-300 rounded px-4 py-2"
          />

          {/* Register Button */}
          <PrimaryButton className="mt-2">Register</PrimaryButton>
        </form>

        {/* Login Link */}
        <div className="mt-4 text-sm text-gray-700">
          Sudah punya akun?{" "}
          <span
            className="text-primary font-semibold cursor-pointer underline"
            onClick={() => router.push("/v2/login")}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
