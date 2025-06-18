import { CreateIncome } from '@/interface/report';
import { createAsyncThunk } from '@reduxjs/toolkit';
import nProgress from 'nprogress';

export const fetchIncomes = createAsyncThunk(
  'incomes/fetchIncomes',
  async (_, { rejectWithValue }) => {
    try {
      nProgress.start();
      const response = await fetch('/api/pemasukan/get');
      const data = await response.json();
      nProgress.done();
      return data;
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Gagal mengambil data pemasukan');
    }
  }
);

export const fetchSources = createAsyncThunk(
  'incomes/fetchSources',
  async (_, { rejectWithValue }) => {
    try {
      nProgress.start();
      const response = await fetch('/api/pemasukan/category/get');
      const data = await response.json();
      nProgress.done();
      return data.categories;
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Gagal mengambil sumber pemasukan');
    }
  }
);

export const addSource = createAsyncThunk<{message: string}, string>(
  'incomes/addSource',
  async (name: string, { rejectWithValue }) => {
    try {
      nProgress.start();
      const response = await fetch('/api/pemasukan/category/create', {
        method: 'POST',
        body: JSON.stringify({ name }),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      nProgress.done();

      if(!response.ok) return rejectWithValue(data.error || 'Gagal menambahkan sumber pemasukan');
      return { message: data.message };
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Terjadi kesalahan dalam menambahkan sumber pemasukan.');
    }
  }
);

export const createIncome = createAsyncThunk<{message: string}, CreateIncome>(
  'incomes/createIncome',
  async (newIncome: CreateIncome, { rejectWithValue }) => {
    try {
      nProgress.start();
      const response = await fetch('/api/pemasukan/create', {
        method: 'POST',
        body: JSON.stringify(newIncome),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      nProgress.done();

      if(!response.ok) return rejectWithValue(data.error || 'Gagal menambahkan pemasukan');
      return { message: data.message };
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Terjadi kesalahan dalam menambahkan pemasukan.');
    }
  }
);