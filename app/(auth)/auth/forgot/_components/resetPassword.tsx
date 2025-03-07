"use client"

import nProgress from "nprogress";
import Input  from "../../_components/input";
import { useState } from "react";
import passwordValidation from "@/validation/password-validation";
import showAlert from "@/helper/showAlert";
import emailValidation from "@/validation/email-validation";
import {useRouter} from "next/navigation";
import RedirectSolution from "../../_components/redirectSolution";

export default function ResetPassword({setMenu}: any) {
    const [data, setData] = useState({
        password: "",
        confirmPassword: "",
    });
    const router = useRouter();
    const [isError, setIsError] = useState<boolean>(false);

    const handleClick = async () => {
        try {
            nProgress.start();
            if( 
              !passwordValidation(data.password, 'password')
              && data.password === data.confirmPassword
            ) {
                const response = await fetch("/api/forgot/reset-password", {
                    method: 'POST',
                    body: JSON.stringify(data)
                });
                const responseData = await response.json();
                if(response.ok) {
                    showAlert(responseData.message, router, "success", '/auth');
                    setMenu('Verifikasi');
                } else {
                    showAlert(responseData.error || "Email tidak ditemukan, silahkan coba lagi!", router, "error", '/auth/forgot');
                }
            } else setIsError(true)
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
                  label="Password"
                  data={data}
                  setData={setData}
                  dataKey="password"
                  placeholder="password"
                  type="password"
                  isError={isError}
                  message={passwordValidation(data.password, 'password')}
                />
                <Input
                  label="Konfirmasi Password"
                  data={data}
                  setData={setData}
                  dataKey="confirmPassword"
                  placeholder="Konfirmasi Password"
                  type="password"
                  isError={isError}
                  message={isError && !passwordValidation(data.password, 'password') && data.password !== data.confirmPassword && "Pastikan password dan konfirmasi password sama"}
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
                Verifikasi Akun Email
              </button>
            </div>
        </>
    );
}