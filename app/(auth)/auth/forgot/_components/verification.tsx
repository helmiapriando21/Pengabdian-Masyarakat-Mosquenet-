"use client"

import nProgress from "nprogress";
import Input  from "../../_components/input";
import { useState } from "react";
import showAlert from "@/helper/showAlert";
import {useRouter} from "next/navigation";
import RedirectSolution from "../../_components/redirectSolution";

export default function Verification({setMenu}: any) {
    const [data, setData] = useState({
        token: "",
    });
    const router = useRouter();
    const [isError, setIsError] = useState<boolean>(false);

    const handleClick = async () => {
        try {
            nProgress.start();
            if( data.token !== "" ) {
                const response = await fetch("/api/forgot/verify-email", {
                    method: 'POST',
                    body: JSON.stringify(data)
                });
                const responseData = await response.json();
                if(response.ok) {
                    showAlert(responseData.message, router, "success", '/verification');
                    setMenu('Ubah Password');
                } else {
                    showAlert("Token tidak valid, silahkan coba lagi!", router, "error", '/auth/forgot');
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
                  label="Token"
                  data={data} 
                  setData={setData}
                  dataKey="token"
                  type="text"
                  placeholder="Tambahkan Token"
                  isError={isError}
                  message={"Token yang anda tambahkan tidak valid. Periksa email anda"}
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