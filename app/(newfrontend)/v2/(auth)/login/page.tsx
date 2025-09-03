"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/app/components/PrimaryButton";
import IMG from "@/content/img";
import { FaChevronLeft } from "react-icons/fa";
import nProgress from "nprogress";
import showAlert from "@/services/showAlert"; // Pastikan ada seperti di project lama
import emailValidation from "@/validation/email-validation";
import passwordValidation from "@/validation/password-validation";

const LoginPage = () => {
  const router = useRouter();

  // State untuk form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);

  const handleLogin = async () => {
    try {
      nProgress.start();

      // validasi input
      const emailMsg = emailValidation(email, "email");
      const passMsg = passwordValidation(password);

      if (!emailMsg && !passMsg) {
        // Kirim ke API
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const responseData = await response.json();

        if (response.ok) {
          showAlert(
            responseData.message,
            router,
            "success",
            responseData.redirect ? "/v2/dashboard" : "/"
          );
        } else {
          showAlert(
            responseData.error ||
              "Terjadi kesalahan pada login, silahkan coba lagi!",
            router,
            "error",
            "/v2/login"
          );
        }
      } else {
        setIsError(true);
        showAlert("Email atau password tidak valid", router, "error", "/v2/login");
      }
    } catch (err) {
      console.log("Error:", err);
      showAlert(
        "Terjadi kesalahan pada login, silahkan coba lagi!",
        router,
        "error",
        "/v2/login"
      );
    } finally {
      nProgress.done();
    }
  };

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={`w-full max-w-[400px] border ${
              isError ? "border-red-500" : "border-gray-300"
            } rounded px-4 py-2`}
          />

          {/* Password Input */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={`w-full max-w-[400px] border ${
              isError ? "border-red-500" : "border-gray-300"
            } rounded px-4 py-2`}
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
            onClick={handleLogin}
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
