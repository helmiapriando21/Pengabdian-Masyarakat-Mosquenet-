"use client"

import nProgress from "nprogress";
import Input  from "./input";
import { useState, useEffect } from "react";
import Select from "./select";
import showAlert from "@/helper/showAlert";
import { useRouter } from "next/navigation";
import emailValidation from "@/validation/email-validation";
import telpValidation from "@/validation/telp-validation";
import basicValidation from "@/validation/basic-validation";
import passwordValidation from "@/validation/password-validation";
import { getMasjidList } from "@/helper/getData";
import RedirectSolution from "./redirectSolution";
import { UserData } from "@/interface/auth";
import { SelectType } from "@/interface/form";
import numberValidation from "@/validation/number-validation";

export default function Jamaah({ setMenu, setIsChoose, setSelectedRegisterMenu }: any) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<UserData>();
    const [mosqueOption, setMosqueOption] = useState<SelectType[]>([]);
    const [isError, setIsError] = useState<boolean>(false);
    const router = useRouter();
    
    useEffect(() => {
        const initData = async () => {
            const data = await getMasjidList(setIsLoading);
            setMosqueOption(data.map((value: any) => ({
                id: value.id,
                name: `${value.name}. ${value.location}`
            })));
        }
    
        if(isLoading) {
            initData();
        }
    }, [isLoading]);

    const handleClick = async () => {
        try {
            nProgress.start();
            if(
                !emailValidation(data?.email || '', 'alamat email') && 
                !telpValidation(data?.telp || '', 'nomor handphone') && 
                !basicValidation(data?.name || '', 'nama') && 
                !passwordValidation(data?.password || '', 'password') &&
                !numberValidation(data?.mosque_id, 'domisili')
            ) {
                const response = await fetch("/api/register", {
                    method: 'POST',
                    body: JSON.stringify({
                        data,
                        destination: "jamaah"
                    })
                });
                const responseData = await response.json();
                console.log(response);
                if(response.ok) {
                    showAlert(responseData.message, router, "success", '/auth');
                    setData(undefined);
                } else {
                    showAlert("Terjadi kesalahan pada registrasi, silahkan coba lagi!", router, "error", '/login');
                }
            } else setIsError(true);
        } catch (err){
            console.log("Error: ", err);
            showAlert("Terjadi kesalahan pada registrasi, silahkan coba lagi!", router, "error", '/login');
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
                  message={emailValidation(data?.email || '', 'alamat email')}
                />
                <Input
                  label="Nomor Telepon"
                  data={data} 
                  setData={setData}
                  dataKey="telp"
                  type="tel"
                  placeholder="Nomor Telepon"
                  isError={isError}
                  message={telpValidation(data?.telp || '', 'nomor handphone')}
                />
                <Input
                  label={'Nama'}
                  data={data} 
                  setData={setData}
                  dataKey="name"
                  type="text"
                  placeholder="Nama"
                  isError={isError}
                  message={basicValidation(data?.name || '', 'nama')}
                />
                <Select
                  label="Domisili"
                  data={data}
                  setData={setData}
                  dataKey="mosque_id"
                  placeholder="--Domisili--"
                  optionsList={mosqueOption}
                  isError={isError}
                  message={numberValidation(data?.mosque_id, 'domisili')}
                />
                <Input
                  label="Password"
                  data={data}
                  setData={setData}
                  dataKey="password"
                  placeholder="password"
                  type="password"
                  isError={isError}
                  message={passwordValidation(data?.password || '', 'password')}
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