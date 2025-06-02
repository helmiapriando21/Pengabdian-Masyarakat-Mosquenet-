import { ListAset } from '@/interface/aset';
import { ListMosque } from '@/interface/mosque';
import { createAsyncThunk } from '@reduxjs/toolkit';
import nProgress from 'nprogress';

export const fetchMosques = createAsyncThunk<ListMosque[], string>(
  'mosque/fetchMosque',
  async (url, { rejectWithValue }) => {
    try {
      nProgress.start();
      const response = await fetch(url);
      const data = await response.json();
      nProgress.done();
      return data.mosques;
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Gagal mengambil masjid');
    }
  }
);

export const verifyMosque = createAsyncThunk<{ message: string }, {id: string, verified: Boolean}>(
  'mosque/verifyMosque',
  async ({id, verified}, { rejectWithValue }) => {
    try {
      nProgress.start();
      const response = await fetch(`/api/master/mosque/${id}`, {
        method: 'PUT',
        body: JSON.stringify({verified}),
        headers: { 'Content-Type': 'application/json' } 
      });
      const data = await response.json();
      nProgress.done();
      
      if(!response.ok) return rejectWithValue(data.error || 'Gagal memverifikasi masjid');
      return { message: data.message };
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Gagal memverifikasi masjid');
    }
  }
);

// export const createAssets = createAsyncThunk<{message: string}, ListAset>(
//   'assets/createAsset',
//   async (newAsset: ListAset, { rejectWithValue }) => {
//     try {
//       nProgress.start();
//       const response = await fetch('/api/aset/create', {
//         method: 'POST',
//         body: JSON.stringify(newAsset),
//         headers: { 'Content-Type': 'application/json' }
//       });
//       const data = await response.json();
//       nProgress.done();

//       if(!response.ok) return rejectWithValue(data.error || 'Gagal menambahkan aset');
//       return { message: data.message };
//     } catch (err) {
//       nProgress.done();
//       return rejectWithValue('Terjadi kesalahan dalam menambahkan aset.');
//     }
//   }
// );

// export const updateAsset = createAsyncThunk<{message: string}, ListAset>(
//   'assets/updateAsset',
//   async (newAsset: ListAset, { rejectWithValue }) => {
//     try {
//       nProgress.start();
//       const {id, ...sendData} = newAsset;
//       const response = await fetch(`/api/aset/edit/${newAsset.id}`, {
//         method: 'POST',
//         body: JSON.stringify(sendData),
//         headers: { 'Content-Type': 'application/json' }
//       });
//       const data = await response.json();
//       nProgress.done();

//       if(!response.ok) return rejectWithValue(data.error || 'Gagal mengubah aset');
//       return { message: data.message };
//     } catch (err) {
//       nProgress.done();
//       return rejectWithValue('Terjadi kesalahan dalam mengubah aset.');
//     }
//   }
// );

// export const deleteAsset = createAsyncThunk<{message: string}, number>(
//   'assets/deleteAsset',
//   async (id: number, { rejectWithValue }) => {
//     try {
//       nProgress.start();
//       const response = await fetch(`/api/aset/delete/${id}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' }
//       });
//       const data = await response.json();
//       nProgress.done();

//       if(!response.ok) return rejectWithValue(data.error || 'Gagal menghapus aset');
//       return { message: data.message };
//     } catch (err) {
//       nProgress.done();
//       return rejectWithValue('Terjadi kesalahan dalam menghapus aset.');
//     }
//   }
// );