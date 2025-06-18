import { Content, ListContent } from '@/interface/content';
import generateFormData from '@/services/generateFormData';
import { createAsyncThunk } from '@reduxjs/toolkit';
import nProgress from 'nprogress';
import Cookies from 'js-cookie';

export const fetchContents = createAsyncThunk(
  'contents/fetchContents',
  async (masjid_id: string | null, { rejectWithValue }) => {
    try {
      nProgress.start();
      const endPoint = masjid_id ? `/api/mosques/konten/${masjid_id}` : '/api/konten/get';
      const response = await fetch(endPoint);
      const data = await response.json();
      nProgress.done();
      return data.contents;
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Gagal mengambil konten');
    }
  }
);

export const fetchContent = createAsyncThunk(
  'contents/fetchContent',
  async (id: number, { rejectWithValue }) => {
    try {
      nProgress.start();
      const response = await fetch(`/api/konten/detail/${id}`);
      const data = await response.json();
      nProgress.done();
      return data.content;
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Gagal mengambil konten');
    }
  }
);

export const createContent = createAsyncThunk<{message: string}, Content>(
  'contents/createContent',
  async (newContent: Content, { rejectWithValue }) => {
    try {
      const formData: FormData = generateFormData(newContent);
      const userId = Cookies.get('user-id');

      nProgress.start();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/content`, {
        method: 'POST',
        body: formData,
        headers: { 
          "Authorization": `${userId}`
        }
      });
      const data = await response.json();
      nProgress.done();

      if(!response.ok) return rejectWithValue(data.error || 'Gagal menambahkan konten');
      return { message: data.message };
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Terjadi kesalahan dalam menambahkan konten.');
    }
  }
);

export const updateContent = createAsyncThunk<{message: string}, ListContent>(
  'contents/updateContent',
  async (newContent: ListContent, { rejectWithValue }) => {
    try {
      const {post_date, ...postData} = newContent;
      const formData: FormData = generateFormData(postData);
      const userId = Cookies.get('user-id');

      nProgress.start();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/content/${postData.id}`, {
        method: 'PUT',
        body: formData,
        headers: { 
          "Authorization": `${userId}`
        }
      });
      const data = await response.json();
      nProgress.done();

      if(!response.ok) return rejectWithValue(data.error || 'Gagal mengubah konten');
      return { message: data.message };
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Terjadi kesalahan dalam mengubah konten.');
    }
  }
);

export const deleteContent = createAsyncThunk<{message: string}, number>(
  'contents/deleteContent',
  async (id: number, { rejectWithValue }) => {
    try {
      nProgress.start();
      const response = await fetch(`/api/konten/delete/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      nProgress.done();

      if(!response.ok) return rejectWithValue(data.error || 'Gagal menghapus konten');
      return { message: data.message };
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Terjadi kesalahan dalam menghapus konten.');
    }
  }
);