"use client"

import showAlert from "@/helper/showAlert";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Verify(){
  const { token } = useParams();
  const router = useRouter();

  const verify = async () => {
    if(token) {
      const response = await fetch('/api/verify', {
        method: 'POST',
        body: JSON.stringify({ token: token })
      });
      const responseData = await response.json();
      if(response.ok) {
        showAlert(responseData.message, router, "success", '/auth');
      } else {
        showAlert("Terjadi kesalahan verifikasi, token tidak valid", router, "error", '/auth');
      }
    } else {
      showAlert("Terjadi kesalahan verifikasi, tidak ada token yang diterima", router, "error", '/auth');
    }
  }

  useEffect(() => {
    verify();
  }, [token])
  
  return null
}