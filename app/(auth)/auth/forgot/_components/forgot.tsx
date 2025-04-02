"use client"

import nProgress from "nprogress";
import Input  from "../../_components/input";
import React, { useState } from "react";
import showAlert from "@/services/showAlert";
import emailValidation from "@/validation/email-validation";
import { useRouter } from "next/navigation";
import RedirectSolution from "../../_components/redirectSolution";
import { AuthForgot } from "@/interface/auth";

interface ForgotProps {
  setMenu: React.Dispatch<React.SetStateAction<string>>
}

export default function Forgot({setMenu}: ForgotProps) {
    const [data, setData] = useState<AuthForgot>();
    const router = useRouter();
    const [isError, setIsError] = useState<boolean>(false);

    const handleClick = async () => {
        try {
            nProgress.start();
            if( !emailValidation(data?.email || '', 'alamat email') ) {
                const response = await fetch("/api/forgot/send-token", {
                    method: 'POST',
                    body: JSON.stringify(data)
                });
                const responseData = await response.json();
                if(response.ok) {
                    showAlert(responseData.message, router, "success", '/verification');
                    setMenu('Verifikasi');
                } else {
                    showAlert(responseData.error || "Email tidak ditemukan, silahkan coba lagi!", router, "error", '/auth/forgot');
                }
            } else setIsError(true);
        } catch (err){
            console.log("Error: ", err);
            showAlert("Terjadi kesalahan pada verifikasi, silahkan coba lagi!", router, "error", '/auth/forgot');
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
                <RedirectSolution 
                  question="Sudah punya akun?" 
                  answer="Klik disini" 
                  solution={() => {
                    router.push('/auth');
                  }}
                  textAlign="text-end"
                />
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleClick}
                className="p-[10px] bg-[#6FD365] text-white rounded-md"
              >
                Cari Email
              </button>
            </div>
        </>
    );
}