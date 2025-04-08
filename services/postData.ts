import { ListAset } from "@/interface/aset";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { CreateIncome, CreateOutcome } from "@/interface/report";
import { CreateBank, Donation } from "@/interface/bank";
import { postDataOnly, postDataWithRedirectServices } from "./api";
import Cookies from 'js-cookie'
import { DetailActivity } from "@/interface/activity";
import generateFormData from "./generateFormData";
import { ArchiveDocument, ArchiveDocuments, ArchiveTemplate, ArchiveTemplates } from "@/interface/archive";

const updateRole = async (email: string, role: string) => {
  await postDataOnly(
    '/api/user/update-role',
    {
      email: email,
      role: role
    }
  )
};

const addCategory = async (name: string, router: AppRouterInstance) => {
  await postDataWithRedirectServices(
    '/api/pemasukan/category/create',
    { name: name },
    router,
    "Terjadi kesalahan pada menambahkan kategori pemasukan, silahkan coba lagi!"
  );
}

const addPemasukan = async (data: CreateIncome | undefined, router: AppRouterInstance) => {
  await postDataWithRedirectServices(
    '/api/pemasukan/create',
    data,
    router,
    "Terjadi kesalahan pada menambahkan pemasukan, silahkan coba lagi!"
  );
}

const addReason = async (name: string, router: AppRouterInstance) => {
  await postDataWithRedirectServices(
    '/api/pengeluaran/reason/create',
    { name: name },
    router,
    "Terjadi kesalahan pada menambahkan alasan pengeluaran, silahkan coba lagi!"
  );
}

const addPengeluaran = async (data: CreateOutcome | undefined, router: AppRouterInstance) => {
  await postDataWithRedirectServices(
    '/api/pengeluaran/create',
    data,
    router,
    "Terjadi kesalahan pada menambahkan pengeluaran, silahkan coba lagi!"
  );
}

const addAset = async (data: ListAset | undefined, router: any) => {
  await postDataWithRedirectServices(
    '/api/aset/create',
    data,
    router,
    "Terjadi kesalahan pada menambahkan aset, silahkan coba lagi!"
  );
}

const editAset = async (data: ListAset, id: number | undefined, router: any) => {
  const sendData = {
    amount: data.amount,
    condition: data.condition,
    name: data.name,
    unit: data.unit
  }
  await postDataWithRedirectServices(
    `/api/aset/edit/${id}`,
    sendData,
    router,
    "Terjadi kesalahan pada mengubah aset, silahkan coba lagi!"
  );
}

const deleteAset = async (id: number, router: AppRouterInstance) => {
  await postDataWithRedirectServices(
    `/api/aset/delete/${id}`,
    {},
    router,
    "Terjadi kesalahan pada menghapus aset, silahkan coba lagi!"
  );
}

const createKegiatan = async (data: DetailActivity & { time: string }, router: AppRouterInstance) => {
  const formData: FormData = generateFormData(data);

  const userId = Cookies.get('user-id');
  if(userId) {
    formData.append("user_id", userId);
  }

  postDataWithRedirectServices(
    `${process.env.NEXT_PUBLIC_API_URL}/kegiatan/add`,
    formData,
    router,
    "Terjadi kesalahan pada menambahkan kegiatan, silahkan coba lagi!"
  );
}

const editKegiatan = async (data: DetailActivity & { time: string }, router: AppRouterInstance) => {
  const formData: FormData = generateFormData(data);

  postDataWithRedirectServices(
    `${process.env.NEXT_PUBLIC_API_URL}/kegiatan/edit`,
    formData,
    router,
    "Terjadi kesalahan pada mengubah kegiatan, silahkan coba lagi!"
  );
}

const deleteKegiatan = async (id: number, router: AppRouterInstance) => {
  await postDataWithRedirectServices(
    `/api/kegiatan/delete/${id}`,
    {},
    router,
    "Terjadi kesalahan pada menghapus kegiatan, silahkan coba lagi!"
  );
}

const createKasPayment = async (amount: number) => {
  const response = await postDataOnly('/api/payment-kas', { amount: amount });
  const responseData = await response.json();
  return responseData.payment;
}

const addPurposeBankAccount = async (data: string, router: AppRouterInstance) => {
  await postDataWithRedirectServices(
    '/api/daftar-rekening-bank/purpose/create',
    { name: data },
    router,
    "Terjadi kesalahan pada menambahkan tujuan rekening bank. silahkan coba lagi!"
  );
}

const addBankAccount = async (data: CreateBank, router: AppRouterInstance) => {
  const formData: FormData = generateFormData(data);

  postDataWithRedirectServices(
    `${process.env.NEXT_PUBLIC_API_URL}/account-bank/create`,
    formData,
    router,
    "Terjadi kesalahan pada menambahkan rekening, silahkan coba lagi!"
  );
}

const sendCritics = async (data: { message: string }, router: AppRouterInstance) => {
  await postDataWithRedirectServices(
    '/api/critics-suggestion',
    data,
    router,
    "Terjadi kesalahan pada mengirimkan kritik. silahkan coba lagi!"
  );
}

const saveTemplateDocument = async (data: ArchiveTemplate, router: AppRouterInstance) => {
  const formData: FormData = generateFormData(data);

  const userId = Cookies.get('user-id');
  if(userId) {
    formData.append("user_id", userId);
  }

  postDataWithRedirectServices(
    `${process.env.NEXT_PUBLIC_API_URL}/archive/template/create`,
    formData,
    router,
    "Terjadi kesalahan pada menambahkan template dokumen. Silahkan coba lagi!"
  );
}

const changeTemplateDocument = async (data: ArchiveTemplates, router: AppRouterInstance) => {
  const { id, document, ...sendData } = data;
  const formData: FormData = generateFormData(document instanceof File ? {...sendData, document} : sendData);

  postDataWithRedirectServices(
    `${process.env.NEXT_PUBLIC_API_URL}/archive/template/update/${id}`,
    formData,
    router,
    "Terjadi kesalahan pada mengubah template dokumen, silahkan coba lagi!",
    "PUT"
  );
}

const deleteTemplateDocument = async (id: number, router: AppRouterInstance) => {
  postDataWithRedirectServices(
    `${process.env.NEXT_PUBLIC_API_URL}/archive/template/delete/${id}`,
    {},
    router,
    "Terjadi kesalahan pada menghapus template dokumen, silahkan coba lagi!",
    "DELETE"
  );
}

const saveDocument = async (data: ArchiveDocument, router: AppRouterInstance) => {
  const formData: FormData = generateFormData(data);

  const userId = Cookies.get('user-id');
  if(userId) {
    formData.append("user_id", userId);
  }

  postDataWithRedirectServices(
    `${process.env.NEXT_PUBLIC_API_URL}/archive/document/create`,
    formData,
    router,
    "Terjadi kesalahan pada menambahkan dokumen. Silahkan coba lagi!"
  );
}

const changeDocument = async (data: ArchiveDocuments, router: AppRouterInstance) => {
  const { id, document, ...sendData } = data;
  const formData: FormData = generateFormData(document instanceof File ? {...sendData, document} : sendData);

  postDataWithRedirectServices(
    `${process.env.NEXT_PUBLIC_API_URL}/archive/document/update/${id}`,
    formData,
    router,
    "Terjadi kesalahan pada mengubah dokumen, silahkan coba lagi!",
    "PUT"
  );
}

const deleteDocument = async (id: number, router: AppRouterInstance) => {
  postDataWithRedirectServices(
    `${process.env.NEXT_PUBLIC_API_URL}/archive/document/delete/${id}`,
    {},
    router,
    "Terjadi kesalahan pada menghapus dokumen, silahkan coba lagi!",
    "DELETE"
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
  updateRole,
  addCategory,
  addPemasukan,
  addReason,
  addPengeluaran,
  addAset,
  editAset,
  deleteAset,
  createKegiatan,
  editKegiatan,
  deleteKegiatan,
  createKasPayment,
  addPurposeBankAccount,
  addBankAccount,
  sendCritics,
  saveTemplateDocument,
  changeTemplateDocument,
  deleteTemplateDocument,
  saveDocument,
  changeDocument,
  deleteDocument,
  sendDonation,
  verifyDonation
};