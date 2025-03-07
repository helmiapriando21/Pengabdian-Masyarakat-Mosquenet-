import nProgress from "nprogress";
import showAlert from "./showAlert";

const getJamaahMasjid = async (setIsLoading: any) => {
  try {
    nProgress.start();
    const response = await fetch('/api/mosque/jamaah', {
      method: 'GET'
    });
    const data = await response.json();
    setIsLoading(false);
    nProgress.done();
    return data;
  } catch (err) {
    console.error("Error: ", err);
  }
}

const getMasjidList = async (setIsLoading: any | null) => {
    try {
        nProgress.start();
        const response = await fetch('/api/mosques/list', {
            method: 'GET',
        });
        const data = await response.json();
        if(setIsLoading) 
            setIsLoading(false);
        nProgress.done();
        return data.mosques;
    } catch (err) {
        console.error("Error: ", err);
    }
}

const getPrayerTimes = async (setIsLoading: any | null, date: any, city: string) => {
    try {
        nProgress.start();
        const response = await fetch(
            `https://api.aladhan.com/v1/timingsByCity/${date}?city=${city}&country=Indonesia&method=3`, {
            method: 'GET',
        });
        const data = await response.json();
        if(setIsLoading) 
            setIsLoading(false);
        nProgress.done();
        return data.data.timings;
    } catch (err) {
        console.error("Error: ", err);
    }
}

const getMasjid = async (setIsLoading: any | null, index: any) => {
    try {
        nProgress.start();
        
        let data;
        if(index) {
          const response = await fetch(
            `/api/mosques/current?mosId=${index}`, 
            {
              method: 'GET',
            }
          );
          data = await response.json();
        } else {
          const response = await fetch(
            '/api/mosques/current',
            {
              method: 'GET',
            }
          )
          data = await response.json();
        }
        
        if(setIsLoading) 
            setIsLoading(false);

        nProgress.done();
        return data;
    } catch (err) {
        console.error("Error: ", err);
    }
}

const getCategoryPemasukanMasjid = async (setIsLoading: any) => {
  try {
    nProgress.start();
    const response = await fetch(
        '/api/pemasukan/category/get', {
        method: 'GET',
    });
    const data = await response.json();
    if(setIsLoading) 
        setIsLoading(false);
    nProgress.done();
    return data.categories;
  } catch (err) {
      console.error("Error: ", err);
  }
}

const getPemasukanMasjid = async (setIsLoading: any) => {
  try {
    nProgress.start();
    const response = await fetch(
        '/api/pemasukan/get', {
        method: 'GET',
    });
    const data = await response.json();
    if(setIsLoading) 
        setIsLoading(false);
    nProgress.done();
    return data.incomes;
  } catch (err) {
      console.error("Error: ", err);
  }
}

const getReasonPengeluaranMasjid = async (setIsLoading: any) => {
  try {
    nProgress.start();
    const response = await fetch(
        '/api/pengeluaran/reason/get', {
        method: 'GET',
    });
    const data = await response.json();
    if(setIsLoading) 
        setIsLoading(false);
    nProgress.done();
    return data.reasons;
  } catch (err) {
      console.error("Error: ", err);
  }
}

const getPengeluaranMasjid = async (setIsLoading: any) => {
  try {
    nProgress.start();
    const response = await fetch(
        '/api/pengeluaran/get', {
        method: 'GET',
    });
    const data = await response.json();
    if(setIsLoading) 
        setIsLoading(false);
    nProgress.done();
    return data.outcomes;
  } catch (err) {
      console.error("Error: ", err);
  }
}

const getLaporanMasjid = async (setIsLoading: any) => {
  try {
    nProgress.start();
    const response = await fetch(
        '/api/laporan', {
        method: 'GET',
    });
    const data = await response.json();
    if(setIsLoading) 
        setIsLoading(false);
    nProgress.done();
    return data.reports;
  } catch (err) {
      console.error("Error: ", err);
  }
}

const getAsetMasjid = async (setIsLoading: any) => {
  try {
    nProgress.start();
    const response = await fetch(
        '/api/aset/get', {
        method: 'GET',
    });
    const data = await response.json();
    if(setIsLoading) 
        setIsLoading(false);
    nProgress.done();
    return data.assets;
  } catch (err) {
      console.error("Error: ", err);
  }
}

const getKegiatanMasjid = async (setIsLoading: any, masjid_id: string | null) => {
  try {
    nProgress.start();
    let data;
    if(masjid_id) {
      const response = await fetch(
        `/api/mosques/kegiatan/${masjid_id}`, {
          method: 'GET'
        } 
      );
      data = await response.json();
    } else {
      const response = await fetch(
          '/api/kegiatan/get', {
          method: 'GET',
      });
      data = await response.json();
    }
    if(setIsLoading) 
        setIsLoading(false);
    nProgress.done();
    return data.activity;
  } catch (err) {
      console.error("Error: ", err);
  }
}

const getDetailKegiatanMasjid = async (setIsLoading: any, id: number) => {
  try {
    nProgress.start();
    const response = await fetch(
        `/api/kegiatan/detail/${id}`, {
        method: 'GET',
    });
    const data = await response.json();
    if(setIsLoading) 
        setIsLoading(false);
    nProgress.done();
    return data.activity;
  } catch (err) {
    console.error("Error: ", err);
  }
}

const getDashboardData = async (setIsLoading: any) => {
  try {
    nProgress.start();
    const response = await fetch(
        '/api/dashboard', {
        method: 'GET',
    });
    const data = await response.json();
    if(setIsLoading) 
        setIsLoading(false);
    nProgress.done();
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

const getValidKasTransaction = async (id: any, router: any) => {
  nProgress.start();
  const response = await fetch(`/api/check-payment-kas/${id}`, {
    method: "GET"
  });
  const responseData = await response.json();
  if(response.ok) {
    showAlert(responseData.message, router, "success", '/this-page');
  } else {
    showAlert(responseData.error || "Pembayaran belum terverifikasi, harap tunggu.", router, "error", '/auth');
  }
  nProgress.done();
}

const getPurposesBankAccountMosque = async (setIsLoading: any) => {
  nProgress.start();
  const response = await fetch(
    '/api/daftar-rekening-bank/purpose/get', {
    method: 'GET',
  });
  const data = await response.json();
  if(setIsLoading) 
    setIsLoading(false);
  nProgress.done();
  return data.purposes;
}

const getBankAccountMosque = async (setIsLoading: any) => {
  nProgress.start();
  const response = await fetch(
    '/api/daftar-rekening-bank/get', {
    method: 'GET',
  });
  const data = await response.json();
  if(setIsLoading) 
    setIsLoading(false);
  nProgress.done();
  return data.account_bank;
}

export {
    getMasjidList,
    getPrayerTimes,
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
    getBankAccountMosque
}