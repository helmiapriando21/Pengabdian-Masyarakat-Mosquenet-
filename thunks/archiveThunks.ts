import generateFormData from '@/services/generateFormData';
import { createAsyncThunk } from '@reduxjs/toolkit';
import nProgress from 'nprogress';
import Cookies from 'js-cookie';
import { ArchiveDocument, ArchiveDocuments, ArchiveTemplate, ArchiveTemplates } from '@/interface/archive';

export const fetchDocuments = createAsyncThunk(
  'archive/fetchDocuments',
  async (_, { rejectWithValue }) => {
    try {
      nProgress.start();
      const response = await fetch('/api/archive/document/get');
      const data = await response.json();
      nProgress.done();
      return data.documents;
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Gagal mengambil dokumen');
    }
  }
);

export const fetchTemplates = createAsyncThunk(
  'archive/fetchTemplates',
  async (_, { rejectWithValue }) => {
    try {
      nProgress.start();
      const response = await fetch('/api/archive/template/get');
      const data = await response.json();
      nProgress.done();
      return data.templates;
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Gagal mengambil template dokumen');
    }
  }
);

export const createDocument = createAsyncThunk<{message: string}, ArchiveDocument>(
  'archive/createDocument',
  async (newDocument: ArchiveDocument, { rejectWithValue }) => {
    try {
      const formData: FormData = generateFormData(newDocument);
      const userId = Cookies.get('user-id');

      nProgress.start();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/archive/document`, {
        method: 'POST',
        body: formData,
        headers: { 
          "Authorization": `${userId}`
        }
      });
      const data = await response.json();
      nProgress.done();

      if(!response.ok) return rejectWithValue(data.error || 'Gagal menambahkan dokumen');
      return { message: data.message };
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Terjadi kesalahan dalam menambahkan dokumen.');
    }
  }
);

export const createTemplate = createAsyncThunk<{message: string}, ArchiveTemplate>(
  'archive/createTemplate',
  async (newTemplate: ArchiveTemplate, { rejectWithValue }) => {
    try {
      const formData: FormData = generateFormData(newTemplate);
      const userId = Cookies.get('user-id');

      nProgress.start();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/archive/template`, {
        method: 'POST',
        body: formData,
        headers: { 
          "Authorization": `${userId}`
        }
      });
      const data = await response.json();
      nProgress.done();

      if(!response.ok) return rejectWithValue(data.error || 'Gagal menambahkan template dokumen');
      return { message: data.message };
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Terjadi kesalahan dalam menambahkan template dokumen.');
    }
  }
);

export const updateDocument = createAsyncThunk<{message: string}, ArchiveDocuments>(
  'archive/updateDocument',
  async (newDocument: ArchiveDocuments, { rejectWithValue }) => {
    try {
      const {id, document, ...sendData} = newDocument;
      const formData: FormData = generateFormData(document instanceof File ? {...sendData, document} : sendData);
      const userId = Cookies.get('user-id');

      nProgress.start();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/archive/document/${id}`, {
        method: 'PUT',
        body: formData,
        headers: { 
          "Authorization": `${userId}`
        }
      });
      const data = await response.json();
      nProgress.done();

      if(!response.ok) return rejectWithValue(data.error || 'Gagal mengubah dokumen');
      return { message: data.message };
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Terjadi kesalahan dalam mengubah dokumen.');
    }
  }
);

export const updateTemplate = createAsyncThunk<{message: string}, ArchiveTemplates>(
  'archive/updateTemplate',
  async (newTemplate: ArchiveTemplates, { rejectWithValue }) => {
    try {
      const {id, document, ...sendData} = newTemplate;
      const formData: FormData = generateFormData(document instanceof File ? {...sendData, document} : sendData);
      const userId = Cookies.get('user-id');

      nProgress.start();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/archive/template/${id}`, {
        method: 'PUT',
        body: formData,
        headers: { 
          "Authorization": `${userId}`
        }
      });
      const data = await response.json();
      nProgress.done();

      if(!response.ok) return rejectWithValue(data.error || 'Gagal mengubah template dokumen');
      return { message: data.message };
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Terjadi kesalahan dalam mengubah template dokumen.');
    }
  }
);

export const deleteDocument = createAsyncThunk<{message: string}, number>(
  'archive/deleteDocument',
  async (id: number, { rejectWithValue }) => {
    try {
      const userId = Cookies.get('user-id');
      
      nProgress.start();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/archive/document/${id}`, {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `${userId}`
        }
      });
      const data = await response.json();
      nProgress.done();

      if(!response.ok) return rejectWithValue(data.error || 'Gagal menghapus dokumen');
      return { message: data.message };
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Terjadi kesalahan dalam menghapus dokumen.');
    }
  }
);

export const deleteTemplate = createAsyncThunk<{message: string}, number>(
  'archive/deleteTemplate',
  async (id: number, { rejectWithValue }) => {
    try {
      const userId = Cookies.get('user-id');

      nProgress.start();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/archive/template/${id}`, {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `${userId}`
        }
      });
      const data = await response.json();
      nProgress.done();

      if(!response.ok) return rejectWithValue(data.error || 'Gagal menghapus template dokumen');
      return { message: data.message };
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Terjadi kesalahan dalam menghapus template dokumen.');
    }
  }
);