import nProgress from "nprogress";
import showAlert from "./showAlert";
import { ListAset } from "@/interface/aset";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { CreateIncome, CreateOutcome } from "@/interface/report";
import { CreateBank } from "@/interface/bank";

const updateRole = async (email: string, role: string) => {
  nProgress.start();
  await fetch('/api/user/update-role', {
    method: "POST",
    body: JSON.stringify({
      email: email,
      role: role
    })
  })
  nProgress.done();
}

const addCategory = async (name: string, router: AppRouterInstance) => {
  nProgress.start();
  const response = await fetch('/api/pemasukan/category/create', {
    method: "POST",
    body: JSON.stringify({
      name: name
    })
  });
  const responseData = await response.json();
  if(response.ok) {
    showAlert(responseData.message, router, "success", '/this-page');
  } else {
    showAlert(responseData.error || "Terjadi kesalahan pada menambahkan kategori pemasukan, silahkan coba lagi!", router, "error", '/auth');
  }
  nProgress.done();
}

const addPemasukan = async (data: CreateIncome | undefined, router: AppRouterInstance) => {
  nProgress.start();
  const response = await fetch('/api/pemasukan/create', {
    method: "POST",
    body: JSON.stringify({
      ...data
    })
  });
  const responseData = await response.json();
  if(response.ok) {
    showAlert(responseData.message, router, "success", '/this-page');
  } else {
    showAlert(responseData.error || "Terjadi kesalahan pada menambahkan pemasukan, silahkan coba lagi!", router, "error", '/auth');
  }
  nProgress.done();
}

const addReason = async (name: string, router: AppRouterInstance) => {
  nProgress.start();
  const response = await fetch('/api/pengeluaran/reason/create', {
    method: "POST",
    body: JSON.stringify({
      name: name
    })
  });
  const responseData = await response.json();
  if(response.ok) {
    showAlert(responseData.message, router, "success", '/this-page');
  } else {
    showAlert(responseData.error || "Terjadi kesalahan pada menambahkan alasan pengeluaran, silahkan coba lagi!", router, "error", '/auth');
  }
  nProgress.done();
}

const addPengeluaran = async (data: CreateOutcome | undefined, router: AppRouterInstance) => {
  nProgress.start();
  const response = await fetch('/api/pengeluaran/create', {
    method: "POST",
    body: JSON.stringify({
      ...data
    })
  });
  const responseData = await response.json();
  if(response.ok) {
    showAlert(responseData.message, router, "success", '/this-page');
  } else {
    showAlert(responseData.error || "Terjadi kesalahan pada menambahkan pengeluaran, silahkan coba lagi!", router, "error", '/auth');
  }
  nProgress.done();
}

const addAset = async (data: ListAset | undefined, router: any) => {
  nProgress.start();
  const response = await fetch('/api/aset/create', {
    method: "POST",
    body: JSON.stringify({
      ...data
    })
  });
  const responseData = await response.json();
  if(response.ok) {
    showAlert(responseData.message, router, "success", '/this-page');
  } else {
    showAlert(responseData.error || "Terjadi kesalahan pada menambahkan aset, silahkan coba lagi!", router, "error", '/auth');
  }
  nProgress.done();
}

const editAset = async (data: ListAset, id: number | undefined, router: any) => {
  nProgress.start();
  const sendData = {
    amount: data.amount,
    condition: data.condition,
    name: data.name,
    unit: data.unit
  }
  const response = await fetch(`/api/aset/edit/${id}`, {
    method: "POST",
    body: JSON.stringify({
      ...sendData
    })
  });
  const responseData = await response.json();
  if(response.ok) {
    showAlert(responseData.message, router, "success", '/this-page');
  } else {
    showAlert(responseData.error || "Terjadi kesalahan pada mengubah aset, silahkan coba lagi!", router, "error", '/auth');
  }
  nProgress.done();
}

const deleteAset = async (id: number, router: AppRouterInstance) => {
  nProgress.start();
  const response = await fetch(`/api/aset/delete/${id}`, {
    method: "POST"
  });
  const responseData = await response.json();
  if(response.ok) {
    showAlert(responseData.message, router, "success", '/this-page');
  } else {
    showAlert(responseData.error || "Terjadi kesalahan pada menghapus aset, silahkan coba lagi!", router, "error", '/auth');
  }
  nProgress.done();
}

const deleteKegiatan = async (id: number, router: AppRouterInstance) => {
  nProgress.start();
  const response = await fetch(`/api/kegiatan/delete/${id}`, {
    method: "POST"
  });
  const responseData = await response.json();
  if(response.ok) {
    showAlert(responseData.message, router, "success", '/this-page');
  } else {
    showAlert(responseData.error || "Terjadi kesalahan pada menghapus kegiatan, silahkan coba lagi!", router, "error", '/auth');
  }
  nProgress.done();
}

const createKasPayment = async (amount: number) => {
  nProgress.start();
  const response = await fetch(`/api/payment-kas`, {
    method: "POST",
    body: JSON.stringify({ amount: amount })
  });
  const responseData = await response.json();
  nProgress.done();
  return responseData.payment;
}

const addPurposeBankAccount = async (data: string, router: AppRouterInstance) => {
  nProgress.start();
  const response = await fetch('/api/daftar-rekening-bank/purpose/create', {
    method: "POST",
    body: JSON.stringify({
      name: data
    })
  });
  const responseData = await response.json();
  if(response.ok) {
    showAlert(responseData.message, router, "success", '/this-page');
  } else {
    showAlert(responseData.error || "Terjadi kesalahan pada menambahkan tujuan rekening bank. silahkan coba lagi!", router, "error", '/auth');
  }
  nProgress.done();
}

const addBankAccount = async (data: CreateBank, router: AppRouterInstance) => {
  nProgress.start();
  const response = await fetch('/api/daftar-rekening-bank/create', {
    method: "POST",
    body: JSON.stringify({
      ...data
    })
  });
  const responseData = await response.json();
  if(response.ok) {
    showAlert(responseData.message, router, "success", '/this-page');
  } else {
    showAlert(responseData.error || "Terjadi kesalahan pada menambahkan rekening bank. silahkan coba lagi!", router, "error", '/auth');
  }
  nProgress.done();
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
  deleteKegiatan,
  createKasPayment,
  addPurposeBankAccount,
  addBankAccount
};