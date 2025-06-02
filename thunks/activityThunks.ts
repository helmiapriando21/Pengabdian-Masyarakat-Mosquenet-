import generateFormData from '@/services/generateFormData';
import { createAsyncThunk } from '@reduxjs/toolkit';
import nProgress from 'nprogress';
import Cookies from 'js-cookie';
import { CreateActivity, DetailActivity } from '@/interface/activity';

export const fetchActivities = createAsyncThunk(
  'activities/fetchActivities',
  async (masjid_id: string | null, { rejectWithValue }) => {
    try {
      nProgress.start();
      const endPoint = masjid_id ? `/api/mosques/kegiatan/${masjid_id}` : '/api/kegiatan/get';
      const response = await fetch(endPoint);
      const data = await response.json();
      nProgress.done();
      return data.activity;
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Gagal mengambil kegiatan');
    }
  }
);

export const fetchActivity = createAsyncThunk(
  'activities/fetchActivity',
  async (id: number, { rejectWithValue }) => {
    try {
      nProgress.start();
      const response = await fetch(`/api/kegiatan/detail/${id}`);
      const data = await response.json();
      nProgress.done();
      return data.activity;
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Gagal mengambil kegiatan');
    }
  }
);

export const createActivity = createAsyncThunk<{message: string}, CreateActivity>(
  'activity/createActivity',
  async (newContent: CreateActivity, { rejectWithValue }) => {
    try {
      const formData: FormData = generateFormData(newContent);
      const userId = Cookies.get('user-id');

      nProgress.start();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/kegiatan`, {
        method: 'POST',
        body: formData,
        headers: { 
          "Authorization": `${userId}`
        }
      });
      const data = await response.json();
      nProgress.done();

      if(!response.ok) return rejectWithValue(data.error || 'Gagal menambahkan kegiatan');
      return { message: data.message };
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Terjadi kesalahan dalam menambahkan kegiatan.');
    }
  }
);

export const updateActivity = createAsyncThunk<{message: string}, CreateActivity>(
  'activities/updateActivity',
  async (newContent: CreateActivity, { rejectWithValue }) => {
    try {
      const {id, ...postData} = newContent;
      const formData: FormData = generateFormData(postData);
      const userId = Cookies.get('user-id');

      nProgress.start();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/kegiatan/${id}`, {
        method: 'PUT',
        body: formData,
        headers: { 
          "Authorization": `${userId}`
        }
      });
      const data = await response.json();
      nProgress.done();

      if(!response.ok) return rejectWithValue(data.error || 'Gagal mengubah kegiatan');
      return { message: data.message };
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Terjadi kesalahan dalam mengubah kegiatan.');
    }
  }
);

export const deleteActivity = createAsyncThunk<{message: string}, number>(
  'activities/deleteActivity',
  async (id: number, { rejectWithValue }) => {
    try {
      nProgress.start();
      const response = await fetch(`/api/kegiatan/delete/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      nProgress.done();

      if(!response.ok) return rejectWithValue(data.error || 'Gagal menghapus kegiatan');
      return { message: data.message };
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Terjadi kesalahan dalam menghapus kegiatan.');
    }
  }
);