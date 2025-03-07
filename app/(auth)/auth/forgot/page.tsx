"use client"

import { useState } from "react"
import Forgot from "./_components/forgot";
import Verification from "./_components/verification";
import ResetPassword from "./_components/resetPassword";

// 'Lupa Password',
// 'Verifikasi',
// 'Ubah Password'
export default function ForgotPage() {
    const [selectedMenu, setSelectedMenu] = useState('Lupa Password');

    return (
        <div 
            className={`flex flex-col gap-8 
                ${selectedMenu === 'Lupa Password' 
                    ? 'translate-x-[201%]' 
                    : selectedMenu === 'Verifikasi' 
                    ? 'translate-x-[100.5%]'
                    : selectedMenu === 'Ubah Password'
                    && 'translate-x-0'
                } w-[33.3%] h-full justify-center bg-[#FFCE3B] p-10 duration-300`
            }
        >
            <h1 className="text-center font-bold text-4xl">{selectedMenu.toUpperCase()}</h1>
            {
                selectedMenu === 'Lupa Password' 
                  ? <Forgot setMenu={setSelectedMenu} />
                  : selectedMenu === 'Verifikasi'
                  ? <Verification setMenu={setSelectedMenu} />
                  : selectedMenu === 'Ubah Password'
                  && <ResetPassword setMenu={setSelectedMenu} />       
            }
        </div>
    );
}