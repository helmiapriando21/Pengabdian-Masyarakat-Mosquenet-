"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import PrimaryButton from "@/app/components/PrimaryButton";
import { FaChevronLeft } from "react-icons/fa6";
import IMG from "@/content/img";
import { useRouter } from "next/navigation";
import { UserData, MosqueData } from "@/interface/auth";
import { SelectType } from "@/interface/form";
import showAlert from "@/services/showAlert";
import basicValidation from "@/validation/basic-validation";
import emailValidation from "@/validation/email-validation";
import numberValidation from "@/validation/number-validation";
import passwordValidation from "@/validation/password-validation";
import telpValidation from "@/validation/telp-validation";
import nProgress from "nprogress";

const RegisterPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<UserData>();
  const [mosqueData, setMosqueData] = useState<MosqueData>();
  const [provinceOptions, setProvinceOptions] = useState<SelectType[]>([]);
  const [cityorregencyOptions, setCityorregencyOptions] = useState<
    SelectType[]
  >([]);
  const [subdistrictOptions, setSubdistrictOptions] = useState<SelectType[]>(
    []
  );
  const [wardOptions, setWardOptions] = useState<SelectType[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const initData = async () => {
      try {
        nProgress.start();
        const response = await fetch("/api/address-list", {
          method: "GET",
        });
        const data = await response.json();
        setProvinceOptions(data.provinces);
        setCityorregencyOptions(data.citiesorregencies);
        setSubdistrictOptions(data.subdistricts);
        setWardOptions(data.wards);
        setIsLoading(false);
      } catch (err) {
        console.error("Error: ", err);
      } finally {
        nProgress.done();
      }
    };

    if (isLoading) {
      initData();
    }
  }, [isLoading]);

  const handleClick = async () => {
    try {
      nProgress.start();
      if (
        !emailValidation(data?.email || "", "alamat email") &&
        !telpValidation(data?.telp || "") &&
        !basicValidation(data?.name || "", "nama") &&
        !passwordValidation(data?.password || "") &&
        !numberValidation(mosqueData?.province_id, "provinsi masjid") &&
        !numberValidation(
          mosqueData?.cityorregency_id,
          "kabupaten/kota masjid"
        ) &&
        !numberValidation(mosqueData?.subdistrict_id, "kecamatan masjid") &&
        !numberValidation(mosqueData?.ward_id, "kelurahan masjid") &&
        !basicValidation(mosqueData?.name || "", "nama masjid") &&
        !basicValidation(mosqueData?.location || "", "alamat masjid")
      ) {
        const response = await fetch("/api/register", {
          method: "POST",
          body: JSON.stringify({
            data,
            mosqueData,
            destination: "masjid",
          }),
        });
        const responseData = await response.json();
        if (response.ok) {
          showAlert(responseData.message, router, "success", "/auth/login");
          setData(undefined);
          setMosqueData(undefined);
          setIsError(false);
        } else {
          showAlert(
            "Terjadi kesalahan pada registrasi, silahkan coba lagi!",
            router,
            "error",
            "/auth/register-masjid"
          );
        }
      } else setIsError(true);
    } catch (err) {
      console.log("Error: ", err);
      showAlert(
        "Terjadi kesalahan pada registrasi, silahkan coba lagi!",
        router,
        "error",
        "/auth"
      );
    } finally {
      nProgress.done();
    }
  };

  if (!isLoading)
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
          <form className="w-full px-10 flex flex-col gap-4 overflow-y-scroll h-full">
            <input
              type="text"
              placeholder="Nama Ketua"
              className="border border-gray-300 rounded px-4 py-2"
              value={data?.name || ""}
              onChange={(e) => {
                setData({
                  ...data!,
                  name: e.target.value,
                });
              }}
            />
            <input
              type="text"
              placeholder="Nama Masjid"
              className="border border-gray-300 rounded px-4 py-2"
              value={mosqueData?.name || ""}
              onChange={(e) => {
                setMosqueData({
                  ...mosqueData!,
                  name: e.target.value,
                });
              }}
            />
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded px-4 py-2"
              value={data?.email || ""}
              onChange={(e) => {
                setData({
                  ...data!,
                  email: e.target.value,
                });
              }}
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded px-4 py-2"
              value={data?.password || ""}
              onChange={(e) => {
                setData({
                  ...data!,
                  password: e.target.value,
                });
              }}
            />
            <input
              type="tel"
              placeholder="Nomor Telepon"
              className="border border-gray-300 rounded px-4 py-2"
              value={data?.telp || ""}
              onChange={(e) => {
                setData({
                  ...data!,
                  telp: e.target.value,
                });
              }}
            />
            <input
              type="text"
              placeholder="Lokasi"
              className="border border-gray-300 rounded px-4 py-2"
              value={mosqueData?.location || ""}
              onChange={(e) => {
                setMosqueData({
                  ...mosqueData!,
                  location: e.target.value,
                });
              }}
            />
            <select
              value={mosqueData?.province_id || ""}
              onChange={(e) => {
                setMosqueData({
                  ...mosqueData!,
                  province_id: Number(e.target.value),
                });
              }}
            >
              <option value="" disabled>
                Pilih Provinsi
              </option>
              {provinceOptions?.map((value) => {
                return (
                  <option key={value.id} value={value.id}>
                    {value.name}
                  </option>
                );
              })}
            </select>
            {mosqueData?.province_id && (
              <select
                value={mosqueData?.cityorregency_id || ""}
                onChange={(e) => {
                  setMosqueData({
                    ...mosqueData!,
                    cityorregency_id: Number(e.target.value),
                  });
                }}
              >
                <option value="" disabled>
                  Pilih Kabupaten/Kota
                </option>
                {cityorregencyOptions
                  ?.filter(
                    (value) => value.provinsi_id == mosqueData.province_id
                  )
                  .map((value) => {
                    return (
                      <option key={value.id} value={value.id}>
                        {value.name}
                      </option>
                    );
                  })}
              </select>
            )}
            {mosqueData?.cityorregency_id && (
              <select
                value={mosqueData?.subdistrict_id || ""}
                onChange={(e) => {
                  setMosqueData({
                    ...mosqueData!,
                    subdistrict_id: Number(e.target.value),
                  });
                }}
              >
                <option value="" disabled>
                  Pilih Kecamatan
                </option>
                {subdistrictOptions
                  ?.filter(
                    (value) => value.kabupaten_id == mosqueData.cityorregency_id
                  )
                  .map((value) => {
                    return (
                      <option key={value.id} value={value.id}>
                        {value.name}
                      </option>
                    );
                  })}
              </select>
            )}
            {mosqueData?.subdistrict_id && (
              <select
                value={mosqueData?.ward_id || ""}
                onChange={(e) => {
                  setMosqueData({
                    ...mosqueData!,
                    ward_id: Number(e.target.value),
                  });
                }}
              >
                <option value="" disabled>
                  Pilih Kelurahan
                </option>
                {wardOptions
                  ?.filter(
                    (value) => value.kecamatan_id == mosqueData.subdistrict_id
                  )
                  .map((value) => {
                    return (
                      <option key={value.id} value={value.id}>
                        {value.name}
                      </option>
                    );
                  })}
              </select>
            )}
            {/* Register Button */}
            <PrimaryButton type="button" onClick={handleClick} className="mt-2">
              Register
            </PrimaryButton>
          </form>

          {/* Login Link */}
          <div className="mt-4 text-sm text-gray-700">
            Sudah punya akun?{" "}
            <span
              className="text-primary font-semibold cursor-pointer underline"
              onClick={() => router.push("/auth/login")}
            >
              Login
            </span>
          </div>
        </div>
      </div>
    );
};

export default RegisterPage;
