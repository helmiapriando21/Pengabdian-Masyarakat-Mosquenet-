import { createAsyncThunk } from '@reduxjs/toolkit';
import nProgress from 'nprogress';

export const fetchConfiguration = createAsyncThunk(
  'config/fetchConfiguration',
  async (_, { rejectWithValue }) => {
    try {
      nProgress.start();
      const response = await fetch('/api/mosque/config');
      const data = await response.json();
      nProgress.done();
      return data.configuration;
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Gagal mengambil pengaturan sistem');
    }
  }
);

export const changeConfiguration = createAsyncThunk<{message: string}, { config: boolean, route: string }>(
  'config/changeConfiguration',
  async ({ config, route }, { rejectWithValue }) => {
    try {
      nProgress.start();
      const response = await fetch(`/api/mosque/config/${route}`, {
        method: 'PUT',
        body: JSON.stringify({ config }),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      console.log(data);
      nProgress.done();

      if(!response.ok) return rejectWithValue(data.error || 'Gagal mengubah konfigurasi sistem');
      return { message: data.message };
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Terjadi kesalahan dalam mengubah konfigurasi sistem.');
    }
  }
);