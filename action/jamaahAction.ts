import { createAsyncThunk } from '@reduxjs/toolkit';
import nProgress from 'nprogress';

export const fetchJamaah = createAsyncThunk(
  'jamaah/fetchJamaah',
  async (_, { rejectWithValue }) => {
    try {
      nProgress.start();
      const response = await fetch('/api/mosque/jamaah');
      const data = await response.json();
      nProgress.done();
      return data.jamaah;
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Gagal mendapatkan daftar jamaah.');
    }
  }
);

export const verifyJamaah = createAsyncThunk<{message: string}, {email: string, verify: boolean}>(
  'jamaah/verifyJamaah',
  async ({email, verify}, { rejectWithValue }) => {
    try {
      nProgress.start();
      const response = await fetch('/api/user/verify', {
        method: 'POST',
        body: JSON.stringify({ email, verify }),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      nProgress.done();

      if(!response.ok) return rejectWithValue(data.error || 'Gagal memverifikasi jamaah');
      return { message: data.message };
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Terjadi kesalahan dalam memverifikasi jamaah.');
    }
  }
)

export const updateRole = createAsyncThunk<{message: string}, {email: string, role: string}>(
  'jamaah/updateRole',
  async ({email, role}, { rejectWithValue }) => {
    try {
      nProgress.start();
      const response = await fetch('/api/user/update-role', {
        method: 'POST',
        body: JSON.stringify({ email, role }),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      nProgress.done();

      if(!response.ok) return rejectWithValue(data.error || 'Gagal mengubah role');
      return { message: data.message };
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Terjadi kesalahan dalam mengubah role.');
    }
  }
)