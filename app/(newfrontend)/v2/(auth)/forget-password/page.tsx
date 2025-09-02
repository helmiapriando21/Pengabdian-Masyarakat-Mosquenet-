"use client";

import React, { useState } from "react";
import Image from "next/image";
import PrimaryButton from "@/app/components/PrimaryButton";
import { useRouter } from "next/navigation";
import IMG from "@/content/img";
import { FaChevronLeft } from "react-icons/fa6";

const ForgetPasswordPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulasi submit
    setSubmitted(true);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${IMG.BG_LOGIN})` }} // Ganti dengan background kamu
    >
      <div className="bg-white rounded-[10px] w-[600px] h-[600px] p-5 relative shadow-lg flex flex-col items-center justify-center gap-4">
        {/* Tombol back */}
        <button
          onClick={() => router.back()}
          className="absolute left-5 top-5 text-2xl font-bold text-gray-600 hover:text-black"
        >
          <FaChevronLeft />
        </button>

        {/* Logo */}
        <Image src={IMG.LOGO} alt="Logo" width={310} height={75} />

        {/* Judul */}
        <div className="text-3xl font-bold mb-4">Reset Password</div>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="w-full px-10 flex flex-col gap-4 items-center"
          >
            <label htmlFor="email" className="text-lg font-medium text-center">
              Masukkan Email anda untuk reset password
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full"
              required
            />
            <PrimaryButton className="w-full mt-2">Kirim</PrimaryButton>
          </form>
        ) : (
          <div className="w-full px-10 mt-4">
            <div className="bg-red-200 text-red-800 p-4 rounded text-center font-medium">
              Silahkan cek email anda, kami sudah mengirim link untuk mereset
              password anda.
              <br />
              <span
                onClick={() => router.push("/reset-password")}
                className="underline cursor-pointer text-red-600 hover:text-red-700 block mt-2"
              >
                Lanjut ke halaman reset password
              </span>
            </div>
          </div>
        )}

        {/* Link ke login */}
        <div className="mt-6 text-sm text-gray-700">
          Sudah ingat password?{" "}
          <span
            className="text-primary font-semibold cursor-pointer underline"
            onClick={() => router.push("/login")}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
