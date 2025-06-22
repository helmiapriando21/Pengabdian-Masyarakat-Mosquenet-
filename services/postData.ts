import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Donation } from "@/interface/bank";
import { postDataWithRedirectServices } from "./api";
import generateFormData from "./generateFormData";

const sendCritics = async (data: { message: string }, router: AppRouterInstance) => {
  await postDataWithRedirectServices(
    '/api/critics-suggestion',
    data,
    router,
    "Terjadi kesalahan pada mengirimkan kritik. silahkan coba lagi!"
  );
}

const sendDonation = async (data: Donation, masjid_id: string, donation_id: string, router: AppRouterInstance) => {
  const formData: FormData = generateFormData(data);

  postDataWithRedirectServices(
    `${process.env.NEXT_PUBLIC_API_URL}/mosque/donations/${masjid_id}/post/${donation_id}`,
    formData,
    router,
    "Terjadi kesalahan pada pengiriman donasi, silahkan coba lagi!",
    'POST'
  );
}

const verifyDonation = async (verified: boolean, masjid_id: string, donation_id: string, router: AppRouterInstance) => {
  postDataWithRedirectServices(
    `/api/pemasukan/mosque/${masjid_id}/donation/${donation_id}`,
    { verified },
    router,
    "Terjadi kesalahan pada proses verifikasi donasi. Silahkan coba lagi",
    'PUT'
  );
}

export {
  sendCritics,
  sendDonation,
  verifyDonation,
};