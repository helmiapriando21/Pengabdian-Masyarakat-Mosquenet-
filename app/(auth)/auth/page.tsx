"use client"

import { useState } from "react"
import Login from "./_components/login";
import SelectMenu from "./_components/selectMenu";
import Masjid from "./_components/registerMasjid";
import Jamaah from "./_components/registerJamaah";

export default function AuthPage() {
    const [selectedMenu, setSelectedMenu] = useState<string>('login');
    const [selectedRegisterMenu, setSelectedRegisterMenu] = useState<string>('');
    const [isChoose, setIsChoose] = useState<boolean>(false);

    return (
        <div 
            className={`flex flex-col gap-8 
                ${selectedMenu === 'login' 
                    ? 'translate-x-[201%]' 
                    : selectedMenu === 'register' && !isChoose 
                    ? 'translate-x-[100.5%]'
                    : selectedMenu === 'register' && isChoose
                    && 'translate-x-0'
                } w-[33.3%] h-full justify-center bg-[#FFCE3B] p-10 duration-300`
            }
        >
            <h1 className="text-center font-bold text-4xl">{selectedMenu.toUpperCase()}</h1>
            {
              selectedMenu === 'login' 
                ? <Login setMenu={setSelectedMenu} />
                : selectedMenu === 'register'
                && !isChoose
                  ? <SelectMenu
                      setMenu={setSelectedMenu}
                      setIsChoose={setIsChoose}
                      setSelectedRegisterMenu={setSelectedRegisterMenu}
                  />
                  : selectedRegisterMenu === 'admin'
                  ? <Masjid 
                      setMenu={setSelectedMenu}
                      setIsChoose={setIsChoose}
                      setSelectedRegisterMenu={setSelectedRegisterMenu}
                  />
                  : <Jamaah 
                      setMenu={setSelectedMenu}
                      setIsChoose={setIsChoose}
                      setSelectedRegisterMenu={setSelectedRegisterMenu}
                  />
                    
            }
        </div>
    );
}