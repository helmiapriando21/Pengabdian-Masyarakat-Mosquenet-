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
  const [role, setRole] = useState<string>();
  const [login, setIsLogin] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const {configuration, loading} = useAppSelector((state) => state.config);

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

  useEffect(() => {
    if(!loading && !configuration)
      dispatch(fetchConfiguration())
  }, [configuration, loading])

  if(login && configuration) 
    return (
      <div className="shadow-md min-h-screen h-full min-w-72 px-10 py-10 flex flex-col gap-10 overflow-scroll">
        <div className="flex flex-col gap-5">
          <SidebarButton
            label="Dashboard"
            action={() => { router.push('/dashboard/main') }}
            currentPath={pathname}
            pathname="/dashboard/main"
          />
        </div>
        {
          role === "Ketua" && <div className="flex flex-col gap-5">
            <GroupButton 
            label="Manajemen Sistem"
            currentPath={pathname}
            pathname="/dashboard/system"
          >
            <SidebarButton
              label="Akun"
              action={() => { router.push('/dashboard/system/account') }}
              currentPath={pathname}
              pathname="/dashboard/system/account"
            />
            <SidebarButton
              label="Pengaturan"
              action={() => { router.push('/dashboard/system/configuration') }}
              currentPath={pathname}
              pathname="/dashboard/system/configuration"
            />
          </GroupButton>
          </div>
        }

        {
          role === "Bendahara" && <GroupButton 
            label="Manajemen Keuangan"
            currentPath={pathname}
            pathname="/dashboard/keuangan"
          >
            <SidebarButton
              label="Pemasukan"
              action={() => { router.push('/dashboard/keuangan/pemasukan') }}
              currentPath={pathname}
              pathname="/dashboard/keuangan/pemasukan"
            />
            <SidebarButton
              label="Pengeluaran"
              action={() => { router.push('/dashboard/keuangan/pengeluaran') }}
              currentPath={pathname}
              pathname="/dashboard/keuangan/pengeluaran"
            />
            <SidebarButton
              label="Laporan Keuangan"
              action={() => { router.push('/dashboard/keuangan/laporan') }}
              currentPath={pathname}
              pathname="/dashboard/keuangan/laporan"
            />
            {
              configuration.is_donation_used && <SidebarButton
                label="Daftar Rekening Bank"
                action={() => { router.push('/dashboard/keuangan/list-rekening-bank') }}
                currentPath={pathname}
                pathname="/dashboard/keuangan/list-rekening-bank"
              />
            }
            
          </GroupButton>
        }
        {
          role === "Sekretaris" && <GroupButton 
            label="Manajemen Arsip"
            currentPath={pathname}
            pathname="/dashboard/archive"
          >
            <SidebarButton
              label="Dokumen"
              action={() => { router.push('/dashboard/archive/document') }}
              currentPath={pathname}
              pathname="/dashboard/archive/document"
            />
            {
              configuration.is_template_documents_used && <SidebarButton
                label="Template"
                action={() => { router.push('/dashboard/archive/template') }}
                currentPath={pathname}
                pathname="/dashboard/archive/template"
              />
            }
          </GroupButton>
        }
        <div className="flex flex-col gap-5">
          <SidebarButton
            label="Manajemen Aset"
            action={() => { router.push('/dashboard/aset') }}
            currentPath={pathname}
            pathname="/dashboard/aset"
          />
        </div>
        <div className="flex flex-col gap-5">
          <SidebarButton
            label="Manajemen Kegiatan"
            action={() => { router.push('/dashboard/kegiatan') }}
            currentPath={pathname}
            pathname="/dashboard/kegiatan"
          />
        </div>
        {
          configuration.is_article_used && <div className="flex flex-col gap-5">
            <SidebarButton
              label="Manajemen Konten"
              action={() => { router.push('/dashboard/content') }}
              currentPath={pathname}
              pathname="/dashboard/content"
            />
          </div>
        }
        {/* <div className="flex flex-col gap-5">
          <SidebarButton
            label="Manajemen Qurban"
            action={() => { router.push('/dashboard/monitoring-kurban') }}
            currentPath={pathname}
            pathname="/dashboard/monitoring-kurban"
          />
        </div> */}
      </div>
    );
}