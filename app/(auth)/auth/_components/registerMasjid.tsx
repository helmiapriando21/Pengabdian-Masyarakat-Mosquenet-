"use client"

import nProgress from "nprogress";
import Input  from "./input";
import { useState, useEffect } from "react";
import Select from "./select";
import showAlert from "@/helper/showAlert";
import { useRouter } from "next/navigation";
import basicValidation from "@/validation/basic-validation";
import emailValidation from "@/validation/email-validation";
import telpValidation from "@/validation/telp-validation";
import passwordValidation from "@/validation/password-validation";
import RedirectSolution from "./redirectSolution";

export default function Masjid({ setMenu, setIsChoose, setSelectedRegisterMenu }: any) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        telp: "",
    });
    const [mosqueData, setMosqueData] = useState({
        name: "",
        location: "",
        subdistrict_id: null,   
        cityorregency_id: null,
        province_id: null, 
        ward_id: null       
    });
    const [provinceOptions, setProvinceOptions] = useState<any>();
    const [cityorregencyOptions, setCityorregencyOptions] = useState<any>();
    const [subdistrictOptions, setSubdistrictOptions] = useState<any>();
    const [wardOptions, setWardOptions] = useState<any>();
    const [isError, setIsError] = useState<boolean>(false);
    const router = useRouter();
    
    useEffect(() => {
        const initData = async () => {
            try {
                nProgress.start();
                const response = await fetch('/api/address-list', {
                    method: 'GET',
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
        }
    
        if(isLoading) {
            initData();
        }
    }, [isLoading]);

    const handleClick = async () => {
        try {
            nProgress.start();
            if(
                !emailValidation(data.email, 'alamat email') && 
                !telpValidation(data.telp, 'nomor handphone') && 
                !basicValidation(data.name, 'nama') && 
                !passwordValidation(data.password, 'password') &&
                !basicValidation(mosqueData.province_id || '', 'provinsi masjid') &&
                !basicValidation(mosqueData.cityorregency_id || '', 'kabupaten/kota masjid') &&
                !basicValidation(mosqueData.subdistrict_id || '', 'kecamatan masjid') &&
                !basicValidation(mosqueData.ward_id || '', 'kelurahan masjid') &&
                !basicValidation(mosqueData.name || '', 'nama masjid') &&
                !basicValidation(mosqueData.location || '', 'alamat masjid')
            ) {
                const response = await fetch("/api/register", {
                    method: 'POST',
                    body: JSON.stringify({
                        data, 
                        mosqueData,
                        destination: "masjid"
                    })
                });
                const responseData = await response.json();
                if(response.ok) {
                    showAlert(responseData.message, router, "success", '/auth');
                    setData({
                      email: "",
                      password: "",
                      name: "",
                      telp: "",
                     });
                     setMosqueData({
                      name: "",
                      location: "",
                      subdistrict_id: null,   
                      cityorregency_id: null,
                      province_id: null, 
                      ward_id: null       
                    });
                } else {
                    showAlert("Terjadi kesalahan pada registrasi, silahkan coba lagi!", router, "error", '/auth');
                }
            } else setIsError(true);
        } catch (err){
            console.log("Error: ", err);
            showAlert("Terjadi kesalahan pada registrasi, silahkan coba lagi!", router, "error", '/auth');
        } finally {
            nProgress.done();
        }
    }

    if(!isLoading) return (
        <>
            <div className="flex flex-col gap-2 overflow-scroll">
                <Input
                  label="Email"
                  data={data} 
                  setData={setData}
                  dataKey="email"
                  type="email"
                  placeholder="email"
                  isError={isError}
                  message={emailValidation(data.email, 'alamat email')}
                />
                <Input
                  label="Nomor Telepon"
                  data={data} 
                  setData={setData}
                  dataKey="telp"
                  type="tel"
                  placeholder="Nomor Telpon"
                  isError={isError}
                  message={telpValidation(data.telp, 'nomor handphone')}
                />
                <Input
                  label="Nama Admin"
                  data={data} 
                  setData={setData}
                  dataKey="name"
                  type="text"
                  placeholder="Nama Admin"
                  isError={isError}
                  message={basicValidation(data.name, 'nama')}
                />
                <Input
                  label="Nama Masjid"
                  data={mosqueData} 
                  setData={setMosqueData}
                  dataKey="name"
                  type="text"
                  placeholder="Nama Masjid"
                  isError={isError}
                  message={basicValidation(mosqueData.name, 'nama masjid')}
                />
                <Input
                  label="Lokasi"
                  data={mosqueData} 
                  setData={setMosqueData}
                  dataKey="location"
                  type="text"
                  placeholder="Alamat Masjid"
                  isError={isError}
                  message={basicValidation(mosqueData.location, 'lokasi masjid')}
                />
                <Select
                  label="Provinsi"
                  key={"province"}
                  data={mosqueData}
                  setData={setMosqueData}
                  dataKey="province_id"
                  placeholder="Provinsi"
                  optionsList={provinceOptions}
                  isError={isError}
                  message={basicValidation(mosqueData.province_id || '', 'provinsi masjid')}
                />
                {
                    mosqueData.province_id
                        && <Select
                            label="Kabupaten/Kota"
                            data={mosqueData}
                            setData={setMosqueData}
                            dataKey="cityorregency_id"
                            placeholder="Kabupaten/Kota"
                            optionsList={cityorregencyOptions.filter((value: any) => value.provinsi_id == mosqueData.province_id)}
                            isError={isError}
                            message={basicValidation(mosqueData.cityorregency_id || '', 'kabupaten/kota masjid')}
                        />
                }
                {
                    mosqueData.cityorregency_id
                        && <Select
                            label="Kecamatan"
                            data={mosqueData}
                            setData={setMosqueData}
                            dataKey="subdistrict_id"
                            placeholder="Kecamatan"
                            optionsList={subdistrictOptions.filter((value: any) => value.kabupaten_id == mosqueData.cityorregency_id)}
                            isError={isError}
                            message={basicValidation(mosqueData.subdistrict_id || '', 'kecamatan masjid')}
                        />
                }
                {
                    mosqueData.subdistrict_id
                        && <Select
                            label="Kelurahan"
                            data={mosqueData}
                            setData={setMosqueData}
                            dataKey="ward_id"
                            placeholder="Kelurahan"
                            optionsList={wardOptions.filter((value: any) => value.kecamatan_id == mosqueData.subdistrict_id)}
                            isError={isError}
                            message={basicValidation(mosqueData.ward_id || '', 'kelurahan masjid')}
                        />
                }
                <Input
                  label="Password"
                  data={data}
                  setData={setData}
                  dataKey="password"
                  placeholder="password"
                  type="password"
                  isError={isError}
                  message={passwordValidation(data.password || '', 'password')}
                />
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleClick}
                className="p-[10px] bg-[#6FD365] text-white rounded-md"
              >
                REGISTER
              </button>
              <RedirectSolution
                question="Sudah punya akun?"
                answer="Klik disini"
                solution={() => {
                  setMenu("login");
                  setSelectedRegisterMenu('');
                  setIsChoose(false)
                }}
                textAlign="text-center"
              />
              <RedirectSolution
                question="Tipe akun yang akan didaftarkan berbeda?"
                answer="Ganti disini"
                solution={() => {
                  setMenu("register");
                  setSelectedRegisterMenu('');
                  setIsChoose(false)
                }}
                textAlign="text-center"
              />
            </div>
        </>
    );
}