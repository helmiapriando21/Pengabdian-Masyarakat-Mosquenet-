import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Donation } from "@/interface/bank";
import { postDataOnly, postDataWithRedirectServices } from "./api";
import generateFormData from "./generateFormData";
import { Animal } from "@/interface/qurban";

const updateRole = async (email: string, role: string) => {
  const data = await postDataOnly(
    '/api/user/update-role',
    {
      email: email,
      role: role
    }
  )

  if(!data.ok) {
    const jsonData = await data.json();
    alert(jsonData.error);
  }
};

const createKasPayment = async (amount: number) => {
  const response = await postDataOnly('/api/payment-kas', { amount: amount });
  const responseData = await response.json();
  return responseData.payment;
}

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

const addAnimal = async (data: Animal, router: AppRouterInstance) => {
  postDataWithRedirectServices(
    '/api/monitoring-kurban/animal/add',
    data,
    router,
    "Terjadi kesalahan pada proses penambahan hewan kurban. Silahkan coba lagi",
    'POST'
  );
}

export {
  updateRole,
  createKasPayment,
  sendCritics,
  sendDonation,
  verifyDonation,
  addAnimal
};