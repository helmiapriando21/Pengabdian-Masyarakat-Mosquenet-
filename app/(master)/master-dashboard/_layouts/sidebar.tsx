"use client"

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import GroupButton from "../_components/groupButton"
import SidebarButton from "../_components/sidebarButton";
import checkUser from "@/services/checkUser";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchConfiguration } from "@/thunks/configurationThunks";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [_, setRole] = useState<string>();
  const [login, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    checkUser(setRole, setIsLogin);
  }, [])

  if(login) 
    return (
      <div className="shadow-md min-h-screen h-full min-w-72 px-10 py-10 flex flex-col gap-10 overflow-scroll">
        <div className="flex flex-col gap-5">
          <SidebarButton
            label="Dashboard"
            action={() => { router.push('/master-dashboard/main') }}
            currentPath={pathname}
            pathname="/master-dashboard/main"
          />
        </div>
        <div className="flex flex-col gap-5">
          <SidebarButton
            label="Kritik dan Saran"
            action={() => { router.push('/master-dashboard/critics') }}
            currentPath={pathname}
            pathname="/master-dashboard/critics"
          />
        </div>
        <div className="flex flex-col gap-5">
          <SidebarButton
            label="Manajemen Masjid"
            action={() => { router.push('/master-dashboard/masjid') }}
            currentPath={pathname}
            pathname="/master-dashboard/masjid"
          />
        </div>
        <div className="flex flex-col gap-5">
          <SidebarButton
            label="Manajemen Pengguna"
            action={() => { router.push('/master-dashboard/user') }}
            currentPath={pathname}
            pathname="/master-dashboard/user"
          />
        </div>
      </div>
    );
}