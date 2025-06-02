"use client"

import { getJamaahMasjid } from "@/services/getData";
import { useEffect, useState } from "react"
import Checkbox from "../../../_components/checkbox";
import Thead from "../../../../../components/thead";
import { updateRole, verifyUser } from "@/services/postData";
import { Jamaah } from "@/interface/jamaah";
import confirmAlert from "@/services/confirmAlert";

export default function Account() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [jamaah, setJamaah] = useState<Jamaah[]>();

  const init = async () => {
    const requestJamaah = await getJamaahMasjid(setIsLoading);
    setJamaah(requestJamaah.jamaah);
  }

  const action = async (email: string, role: string) => {
    const isAction = await confirmAlert("Apakah anda ingin role ini diubah?", 'Ya, tolong diubah!', 'Tidak, jangan diubah');
    if(isAction) {
      await updateRole(email, role);
      await init();
      window.dispatchEvent(new Event('user-updated'));
    }
  }

  const verify = async (email: string, verify: boolean) => {
    const isAction = await confirmAlert(verify ? "Apakah anda ingin membatalkan verifikasi masyarakat ini?" : "Apakah anda ingin verifikasi masyarakat ini?", 'Ya, tolong dilakukan!', 'Tidak, jangan dilakukan!');
    if(isAction) {
      await verifyUser(email, !verify);
      await init();
    }
  }

  useEffect(() => {
    if(isLoading) {
      init();
    }
  }, [])


  if(!isLoading) 
    return (
      <table className="rounded-lg overflow-hidden">
        <Thead labels={['Nama', 'Email', 'Status']} />
        <tbody>
          {jamaah?.map((value: Jamaah, index: number) => {
            return (
              <tr key={index} className="bg-yellow-100 hover:bg-yellow-400">
                <td className="px-4 py-2 min-w-32 text-center">{value.name}</td>
                <td className="px-4 py-2 min-w-32 text-center">{value.email}</td>
                <td className="px-4 py-2 min-w-32 text-center flex gap-3">
                  {
                    value.isVerifiedByAdmin && value.admin.status
                      && <div className="flex gap-3">
                          <Checkbox 
                            label="Ketua" 
                            value={value.admin.role}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              if(e.target.checked) {
                                action(value.email, "Ketua")
                              } else {
                                action(value.email, "Jamaah")
                              }
                            }}
                          />
                          <Checkbox 
                            label="Bendahara" 
                            value={value.admin.role}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              if(e.target.checked) {
                                action(value.email, "Bendahara")
                              } else {
                                action(value.email, "Jamaah")
                              }
                            }}
                          />
                          <Checkbox 
                            label="Sekretaris" 
                            value={value.admin.role}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              if(e.target.checked) {
                                action(value.email, "Sekretaris")
                              } else {
                                action(value.email, "Jamaah")
                              }
                            }}
                          />
                          <Checkbox 
                            label="Marbot" 
                            value={value.admin.role}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              if(e.target.checked) {
                                action(value.email, "Marbot")
                              } else {
                                action(value.email, "Jamaah")
                              }
                            }} 
                          />
                    </div>
                  }
                  {
                    value.isVerifiedByAdmin && <Checkbox
                      label="Pengurus"
                      value={value.admin.status ? value.admin.role : "Jamaah"}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if(e.target.checked) {
                          action(value.email, "Pengurus")
                        } else {
                          action(value.email, "Jamaah")
                        }
                      }}
                    />
                  }
                  {
                    value.isVerifiedByAdmin 
                      ? <button
                          className="w-max h-max px-3 py-1 flex items-center justify-center bg-red-600 font-bold text-white rounded-lg"
                          onClick={() => {
                            verify(value.email, value.isVerifiedByAdmin)
                          }}
                        >Batalkan verifikasi</button>
                      : <button
                          className="w-max h-max px-3 py-1 flex items-center justify-center bg-green-600 font-bold text-white rounded-lg"
                          onClick={() => {
                            verify(value.email, value.isVerifiedByAdmin)
                          }}
                        >Verifikasi</button>
                  }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
}