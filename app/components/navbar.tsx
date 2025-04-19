"use client"

import { useEffect, useState } from "react";
import Logo from "./logo";
import { useRouter } from "next/navigation";
import showAlert from "@/services/showAlert";
import checkUser from "@/services/checkUser";

export default function NavBar() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [role, setRole] = useState<string>();

    const handleLogout = async () => {
        if(isLogin) {
          const response = await fetch(
            '/api/logout',
            { method: 'POST' }
          );
          if(response.ok) {
            const { message } = await response.json();
            showAlert(message, router, 'success', '/auth');
          } else {
            const { error } = await response.json();
            showAlert(error, router, 'error', '/');
          }
        }
    }

    useEffect(() => {
      checkUser(setRole, setIsLogin);

      const handleUserUpdated = () => {
        checkUser(setRole, setIsLogin);
      }

      window.addEventListener('user-updated', handleUserUpdated);

      return () => {
        window.removeEventListener('user-updated', handleUserUpdated);
      }
    }, [])

    return (
      <div className="flex items-center justify-between px-16 py-5 shadow-sm">
        <Logo width={50} height={50} />
        {
          isLogin 
            && <button
                className="border-[#05934a8f] text-[#05934a8f] w-max border-solid border-[1px] rounded-lg px-12 py-1 hover:bg-[#05934a8f] hover:text-white"
            >{role}</button>
        } 
        {
          isLogin 
            ? <button 
                onClick={() => handleLogout()}
                className="bg-[#ff3232] text-white text-xl border-[#FFB356]] border-[1px] border-solid rounded-md px-[39px] py-[8px] shadow-lg"
              >Logout</button>
            : <button 
                onClick={() => router.push('/auth')}
                className="bg-[#05934a8f] text-white text-xl border-[#FFB356]] border-[1px] border-solid rounded-md px-[39px] py-[8px] shadow-lg"
              >Login</button>
        }
      </div>
    );
}