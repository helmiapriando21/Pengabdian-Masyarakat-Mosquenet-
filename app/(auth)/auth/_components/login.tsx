"use client"

import nProgress from "nprogress";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Input  from "./input";
import passwordValidation from "@/validation/password-validation";
import emailValidation from "@/validation/email-validation";
import RedirectSolution from "./redirectSolution";
import { UserData } from "@/interface/auth";
import showAlert from "@/services/showAlert";

interface LoginProps {
  setMenu: React.Dispatch<React.SetStateAction<string>>
}

export default function Login({setMenu}: LoginProps) {
    const [data, setData] = useState<UserData>();
    const router = useRouter();
    const [isError, setIsError] = useState<boolean>(false);

    const handleClick = async () => {
        try {
            nProgress.start();
            if(
                !emailValidation(data?.email || '', 'alamat email') && 
                !passwordValidation(data?.password || '', 'password')
            ) {
                const response = await fetch("/api/login", {
                    method: 'POST',
                    body: JSON.stringify(data)
                });
                const responseData = await response.json();
                if(response.ok) {
                    showAlert(responseData.message, router, "success", '/');
                } else {
                    showAlert(responseData.error || "Terjadi kesalahan pada login, silahkan coba lagi!", router, "error", '/auth');
                }
            } else setIsError(true);
        } catch (err){
            console.log("Error: ", err);
            showAlert("Terjadi kesalahan pada login, silahkan coba lagi!", router, "error", '/auth');
        } finally {
            nProgress.done();
        }
    }

    return (
        <>
            <div className="flex flex-col gap-2">
                <Input
                  label="Email"
                  data={data} 
                  setData={setData}
                  dataKey="email"
                  type="email"
                  placeholder="email"
                  isError={isError}
                  message={emailValidation(data?.email || '', 'email')}
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
                <RedirectSolution
                  question="Lupa Password?"
                  answer="Klik disini"
                  solution={() => {
                    router.push('/auth/forgot')
                  }}
                  textAlign="text-end"
                />
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleClick}
                className="p-[10px] bg-[#6FD365] text-white rounded-md"
              >
                LOGIN
              </button>
              <RedirectSolution
                question="Belum punya akun?"
                answer="Daftarkan akun disini"
                solution={() => {
                  setMenu('register')
                }}
                textAlign="text-center"
              />
            </div>
        </>
    );
}