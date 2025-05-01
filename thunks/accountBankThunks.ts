import { CreateBank, ListBank } from '@/interface/bank';
import generateFormData from '@/services/generateFormData';
import { createAsyncThunk } from '@reduxjs/toolkit';
import nProgress from 'nprogress';
import Cookies from 'js-cookie';

export const fetchPurposesAccountBank = createAsyncThunk(
  'accountBank/fetchPurposesAccountBank',
  async (_, { rejectWithValue }) => {
    try {
      nProgress.start();
      const response = await fetch('/api/daftar-rekening-bank/purpose/get');
      const data = await response.json();
      nProgress.done();
      return data.purposes;
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Gagal mengambil tujuan rekening bank');
    }
  }
);

export const fetchAccountBank = createAsyncThunk<ListBank[], string | null>(
  'accountBank/fetchAccountBank',
  async (masjid_id: string | null, { rejectWithValue }) => {
    try {
      nProgress.start();
      const endPoint = masjid_id ? `/api/mosques/donation/get/${masjid_id}` : '/api/daftar-rekening-bank/get';
      const response = await fetch(endPoint);
      const data = await response.json();
      nProgress.done();
      if(masjid_id) return data.donations
      else return data.account_bank;
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Gagal mengambil akun bank yang terdaftar');
    }
  }
);

export const fetchDonationBank = createAsyncThunk<ListBank, {masjid_id: string, donation_id: string}>(
  'accountBank/fetchDonationBank',
  async ({ masjid_id, donation_id }, { rejectWithValue }) => {
    try {
      nProgress.start();
      const endPoint = `/api/mosques/donation/get/${masjid_id}/detail/${donation_id}`;
      const response = await fetch(endPoint);
      const data = await response.json();
      nProgress.done();
      return data.account;
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Gagal mengambil akun bank yang terdaftar');
    }
  }
);

export const addPurpose = createAsyncThunk<{message: string}, string>(
  'accountBank/addPurpose',
  async (name: string, { rejectWithValue }) => {
    try {
      nProgress.start();
      const response = await fetch('/api/daftar-rekening-bank/purpose/create', {
        method: 'POST',
        body: JSON.stringify({ name }),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      nProgress.done();

      if(!response.ok) return rejectWithValue(data.error || 'Gagal menambahkan keterangan pengeluaran');
      return { message: data.message };
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Terjadi kesalahan dalam menambahkan keterangan pengeluaran.');
    }
  }
);

export const createAccountBank = createAsyncThunk<{message: string}, CreateBank>(
  'accountBank/createAccountBank',
  async (newIncome: CreateBank, { rejectWithValue }) => {
    try {
      const formData: FormData = generateFormData(newIncome);
      const userId = Cookies.get('user-id');

      nProgress.start();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transaction/account-bank`, {
        method: 'POST',
        body: formData,
        headers: { 
          'Authorization': `${userId}` 
        }
      });
      const data = await response.json();
      nProgress.done();

      if(!response.ok) return rejectWithValue(data.error || 'Gagal menambahkan rekening bank');
      return { message: data.message };
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Terjadi kesalahan dalam menambahkan rekening bank.');
    }
  }
);