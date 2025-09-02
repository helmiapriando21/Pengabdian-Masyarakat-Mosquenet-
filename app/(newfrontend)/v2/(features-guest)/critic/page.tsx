"use client";

import React, { useState } from "react";
import IMG from "@/content/img";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/app/components/PrimaryButton";

const KritikSaranPage = () => {
  const [kritik, setKritik] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    if (!kritik.trim()) {
      alert("Silakan isi kritik atau saran terlebih dahulu.");
      return;
    }

    setSubmitted(true);
    setKritik("");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${IMG.BG_KRITIK})` }}
      />
      <div className="absolute inset-0 bg-black opacity-50 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-3xl w-full text-center">
        {/* Judul & Deskripsi */}
        <h1 className="text-[64px] font-bold text-white mb-4">
          Kritik & Saran
        </h1>
        <p className="text-white text-xl font-semibold mb-8">
          Anda dapat memberikan kritik dan saran untuk membantu mengembangkan
          website ini menjadi lebih baik untuk kedepannya. Ayo bantu kami dengan
          memberikan hal-hal baru yang Anda miliki.
        </p>

        {/* Konten utama */}
        {!submitted ? (
          <>
            <label
              htmlFor="kritikInput"
              className="block text-left mb-3 text-2xl text-white"
            >
              Masukkan Kritik / Saran
            </label>
            <textarea
              id="kritikInput"
              value={kritik}
              onChange={(e) => setKritik(e.target.value)}
              rows={6}
              placeholder="Tulis kritik atau saran Anda di sini..."
              className="w-full rounded-[10px] px-[30px] py-[20px] text-xl text-gray-700 bg-white border border-gray-300 focus:outline-none mb-8"
            />

            <PrimaryButton
              onClick={handleSubmit}
              className="w-full text-xl font-bold py-4 rounded"
            >
              Kirim
            </PrimaryButton>
          </>
        ) : (
          <div className="bg-red-100 border border-red-400 text-red-700 px-8 py-10 rounded-[10px]">
            <h2 className="text-2xl font-bold mb-4">Terima kasih!</h2>
            <p className="mb-6">
              Kritik dan saran Anda sudah kami terima. Semoga Allah membalas
              kebaikan Anda.
            </p>
            <p
              onClick={() => router.push("/")}
              className="text-green-600 underline cursor-pointer text-lg hover:text-green-700"
            >
              Kembali ke Beranda
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KritikSaranPage;
