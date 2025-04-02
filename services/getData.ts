import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import React from "react";
import { postDataWithRedirectServices, requestGetApi } from "./api";

const getJamaahMasjid = async (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const data = await requestGetApi('/api/mosque/jamaah', setIsLoading);
    return data;
  } catch (err) {
    console.error("Error: ", err);
  }
}

const getMasjidList = async (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>> | null
) => {
    try {
      const { mosques } = await requestGetApi('/api/mosques/list', setIsLoading);
      return mosques;
    } catch (err) {
        console.error("Error: ", err);
    }
}

const getPrayerTimes = async (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>> | null, 
  date: string, 
  city: string
) => {
    try {
      const { data } = await requestGetApi(`https://api.aladhan.com/v1/timingsByCity/${date}?city=${city}&country=Indonesia&method=3`, setIsLoading);  
      return data.timings;
    } catch (err) {
        console.error("Error: ", err);
    }
}

const getSurahList = async (setIsLoading: React.Dispatch<React.SetStateAction<boolean>> | null) => {
  try {
    const { chapters } = await requestGetApi('https://api.quran.com/api/v4/chapters?language=id', setIsLoading);
    return chapters;
  } catch (err) {
      console.error("Error: ", err);
  }
}

const getSurah = async (setIsLoading: React.Dispatch<React.SetStateAction<boolean>> | null, nomor: number, verses_count: number, selectedRecitation: number) => {
  try {
    const { verses } = await requestGetApi(
      `https://api.quran.com/api/v4/verses/by_chapter/${nomor}?language=id&translations=33&per_page=${verses_count}&fields=text_uthmani&audio=${selectedRecitation}`,
      setIsLoading
    );
    return verses;
  } catch (err) {
      console.error("Error: ", err);
  }
}

const getRecitations = async (setIsLoading: React.Dispatch<React.SetStateAction<boolean>> | null) => {
  try {
    const { recitations } = await requestGetApi('https://api.quran.com/api/v4/resources/recitations', setIsLoading);
    return recitations;
  } catch (err) {
      console.error("Error: ", err);
  }
}

const getMasjid = async (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>> | null, 
  index: string | null
) => {
    try {
        const data = await requestGetApi(
          index ? `/api/mosques/current?mosId=${index}` : '/api/mosques/current', 
          setIsLoading
        );
        return data;
    } catch (err) {
        console.error("Error: ", err);
    }
}

const getCategoryPemasukanMasjid = async (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const { categories } = await requestGetApi('/api/pemasukan/category/get', setIsLoading);
    return categories;
  } catch (err) {
      console.error("Error: ", err);
  }
}

const getPemasukanMasjid = async (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const { incomes } = await requestGetApi('/api/pemasukan/get', setIsLoading);
    return incomes;
  } catch (err) {
      console.error("Error: ", err);
  }
}

const getReasonPengeluaranMasjid = async (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const { reasons } = await requestGetApi('/api/pengeluaran/reason/get', setIsLoading);
    return reasons;
  } catch (err) {
      console.error("Error: ", err);
  }
}

const getPengeluaranMasjid = async (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const { outcomes } = await requestGetApi('/api/pengeluaran/get', setIsLoading);
    return outcomes;
  } catch (err) {
      console.error("Error: ", err);
  }
}

const getLaporanMasjid = async (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const { reports } = await requestGetApi('/api/laporan', setIsLoading);
    return reports;
  } catch (err) {
      console.error("Error: ", err);
  }
}

const getAsetMasjid = async (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const { assets } = await requestGetApi('/api/aset/get', setIsLoading);
    return assets;
  } catch (err) {
      console.error("Error: ", err);
  }
}

const getKegiatanMasjid = async (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, 
  masjid_id: string | null
) => {
  try {
    const { activity } = await requestGetApi(
      masjid_id ? `/api/mosques/kegiatan/${masjid_id}` : '/api/kegiatan/get',
      setIsLoading
    );
    return activity;
  } catch (err) {
      console.error("Error: ", err);
  }
}

const getDetailKegiatanMasjid = async (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, 
  id: number
) => {
  try {
    const { activity } = await requestGetApi(`/api/kegiatan/detail/${id}`, setIsLoading);
    return activity;
  } catch (err) {
    console.error("Error: ", err);
  }
}

const getDashboardData = async (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const data = await requestGetApi('/api/dashboard', setIsLoading);
    return {
      report: data.report,
      pemasukan: data.pemasukan,
      pengeluaran: data.pengeluaran,
      aset: data.aset
    };
  } catch (err) {
      console.error("Error: ", err);
  }
}

const getValidKasTransaction = async (
  id: number, 
  router: AppRouterInstance
) => {
  await postDataWithRedirectServices(
    `/api/check-payment-kas/${id}`,
    {},
    router,
    "Pembayaran belum terverifikasi, harap tunggu."
  );
}

const getPurposesBankAccountMosque = async (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { purposes } = await requestGetApi('/api/daftar-rekening-bank/purpose/get', setIsLoading);
  return purposes;
}

const getBankAccountMosque = async (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { account_bank } = await requestGetApi('/api/daftar-rekening-bank/get', setIsLoading);
  return account_bank;
}

const getMosqueTemplateDocuments = async (setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  const { templates } = await requestGetApi('/api/archive/template/get', setIsLoading);
  return templates;
}

const getMosqueDocuments = async (setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  const { documents } = await requestGetApi('/api/archive/document/get', setIsLoading);
  return documents;
}

export {
    getMasjidList,
    getPrayerTimes,
    getSurahList,
    getSurah,
    getRecitations,
    getMasjid,
    getJamaahMasjid,
    getCategoryPemasukanMasjid,
    getPemasukanMasjid,
    getReasonPengeluaranMasjid,
    getPengeluaranMasjid,
    getLaporanMasjid,
    getAsetMasjid,
    getKegiatanMasjid,
    getDetailKegiatanMasjid,
    getDashboardData,
    getValidKasTransaction,
    getPurposesBankAccountMosque,
    getBankAccountMosque,
    getMosqueTemplateDocuments,
    getMosqueDocuments
}