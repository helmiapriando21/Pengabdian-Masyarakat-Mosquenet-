import checkUser from "@/helper/checkUser";
import { getMasjid } from "@/helper/getData";
import { useEffect, useState } from "react";

export default function HeroSection({ masjidId }: any) {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mosqueName, setMosqueName] = useState<string>(process.env.NEXT_PUBLIC_APP_NAME || '');
  const [role, setRole] = useState<string>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      const response = await checkUser(setRole, setIsLogin);
      if(response.adminStatus)
        setIsAdmin(Boolean(response.adminStatus.value));

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
        <div className="w-full h-full bg-[#FFF59C] bg-opacity-90 text-white flex flex-col gap-3 text-center items-center justify-center px-20">
          <div className="h-full w-max px-20 bg-[#FFDE72] flex flex-col items-center justify-center gap-3 rounded-[70px] shadow-xl">
            <h1 className="font-semibold text-5xl text-black">Assalamualaikum, </h1>
            <h1 className="font-semibold text-5xl text-black">Selamat datang di</h1>
            <h1 className="font-semibold text-5xl text-black">{mosqueName}</h1>
            {
              !isLogin 
                ? <a 
                    className="text-2xl mt-10 text-white justify-self-end w-max px-20 py-3 bg-[#72C299] rounded-3xl font-extrabold shadow-md" 
                    href="/auth"
                  >
                    Daftar Sekarang
                  </a>
                : isAdmin
                    && <a 
                          className="text-2xl mt-10 text-white justify-self-end w-max px-20 py-3 bg-[#72C299] rounded-3xl font-extrabold shadow-md" 
                          href="/dashboard/main"
                        >
                          Kelola Masjid
                        </a>
            }
          </div>
        </div>
      </div>
    );
  else return null
}

