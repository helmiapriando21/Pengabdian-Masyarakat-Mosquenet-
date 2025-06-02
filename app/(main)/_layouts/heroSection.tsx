/* eslint-disable @typescript-eslint/no-explicit-any */

import checkUser from "@/services/checkUser";
import { getMasjid } from "@/services/getData";
import { useEffect, useState } from "react";

export default function HeroSection({ masjidId }: any) {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mosqueName, setMosqueName] = useState<string>(process.env.NEXT_PUBLIC_APP_NAME || '');
  const [masjidIdCookie, setMasjidIdCookie] = useState<string>();
  const [role, setRole] = useState<string>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      const response = await checkUser(setRole, setIsLogin);
      setMasjidIdCookie(response.masjid_id);
      if(response.adminStatus)
        setIsAdmin(response.adminStatus);

      const data = await getMasjid(null, masjidId || null);
      if(data.mosque)
        setMosqueName(data.mosque.name);
    }

    if(isLoading){
      init();
      setIsLoading(false);
    }
  }, [masjidId, isLoading]);

  if(!isLoading)
    return (
      <div className="bg-[url('/img/main-background.png')] bg-cover bg-center w-screen h-[calc(100vh-2.5rem-50px)]">
        <div className="w-full h-full bg-[#FFF59C] bg-opacity-90 text-white flex flex-col gap-3 text-center items-center justify-center sm:px-20">
          <div className="h-full w-max sm:px-20 sm:bg-[#FFDE72] flex flex-col items-center justify-center sm:gap-3 sm:rounded-[70px] sm:shadow-xl">
            <h1 className="font-semibold text-3xl sm:text-5xl text-black">Assalamualaikum, </h1>
            <h1 className="font-semibold text-3xl sm:text-5xl text-black">Selamat datang di</h1>
            <h1 className="font-semibold text-3xl sm:text-5xl text-black">{mosqueName}</h1>
            {
              !isLogin 
                ? <a 
                    className="text-sm sm:text-2xl mt-5 sm:mt-10 text-white justify-self-end w-max px-5 sm:px-20 py-1 sm:py-3 bg-[#72C299] rounded-3xl font-extrabold shadow-md" 
                    href="/auth"
                  >
                    Daftar Sekarang
                  </a>
                : isAdmin
                    && <a 
                          className="text-sm sm:text-2xl mt-5 sm:mt-10 text-white justify-self-end w-max px-5 sm:px-20 py-1 sm:py-3 bg-[#72C299] rounded-3xl font-extrabold shadow-md" 
                          href="/dashboard/main"
                        >
                          Kelola Masjid
                        </a>
            }
            {
              isLogin
                && <a 
                    className="text-sm sm:text-2xl mt-5 sm:mt-10 text-white justify-self-end w-max px-5 sm:px-20 py-1 sm:py-3 bg-[#72C299] rounded-3xl font-extrabold shadow-md" 
                    href={`/masjid/${masjidIdCookie}`}
                  >
                    Lihat Masjid Domisili anda
                  </a>
            }
          </div>
        </div>
      </div>
    );
  else return null
}

