"use client";

import React, { useState } from "react";
import Image from "next/image";
import PrimaryButton from "@/components/PrimaryButton";
import { useRouter } from "next/navigation";
import IMG from "@/content/img";
import { FaChevronLeft } from "react-icons/fa6";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok");
      return;
    }

    // Simulasi proses reset password
    console.log("Password baru:", password);
    setError("");
    alert("Password berhasil diubah. Silakan login kembali.");
    router.push("/login");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url('${IMG.BG_LOGIN}` }}
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
        <div className="text-3xl font-bold mb-4">Buat Password Baru</div>

        <form
          onSubmit={handleSubmit}
          className="w-full px-10 flex flex-col gap-4 items-center"
        >
          <input
            type="password"
            placeholder="Password Baru"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />
          <input
            type="password"
            placeholder="Konfirmasi Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full"
            required
          />

          {error && (
            <div className="text-red-600 text-sm text-center w-full -mt-2">
              {error}
            </div>
          )}

          <PrimaryButton className="w-full mt-2">Simpan Password</PrimaryButton>
        </form>

        {/* Link ke login */}
        <div className="mt-6 text-sm text-gray-700">
          Sudah punya akun?{" "}
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

export default ResetPasswordPage;
