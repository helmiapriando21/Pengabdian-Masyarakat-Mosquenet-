import { CreateOutcome } from '@/interface/report';
import { createAsyncThunk } from '@reduxjs/toolkit';
import nProgress from 'nprogress';

export const fetchOutcomes = createAsyncThunk(
  'outcomes/fetchOutcomes',
  async (_, { rejectWithValue }) => {
    try {
      nProgress.start();
      const response = await fetch('/api/pengeluaran/get');
      const data = await response.json();
      nProgress.done();
      return data.outcomes;
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Gagal mengambil data pengeluaran');
    }
  }
);

export const fetchReasons = createAsyncThunk(
  'outcomes/fetchReasons',
  async (_, { rejectWithValue }) => {
    try {
      nProgress.start();
      const response = await fetch('/api/pengeluaran/reason/get');
      const data = await response.json();
      nProgress.done();
      return data.reasons;
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Gagal mengambil keterangan pengeluaran');
    }
  }
);

export const addReason = createAsyncThunk<{message: string}, string>(
  'outcomes/addReason',
  async (name: string, { rejectWithValue }) => {
    try {
      nProgress.start();
      const response = await fetch('/api/pengeluaran/reason/create', {
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

export const createOutcome = createAsyncThunk<{message: string}, CreateOutcome>(
  'outcomes/createOutcome',
  async (newOutcome: CreateOutcome, { rejectWithValue }) => {
    try {
      nProgress.start();
      const response = await fetch('/api/pengeluaran/create', {
        method: 'POST',
        body: JSON.stringify(newOutcome),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      nProgress.done();

      if(!response.ok) return rejectWithValue(data.error || 'Gagal menambahkan pengeluaran');
      return { message: data.message };
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Terjadi kesalahan dalam menambahkan pengeluaran.');
    }
  }
);

export const updateOutcome = createAsyncThunk<{message: string}, {id: Number, newOutcome: CreateOutcome | {amount: number, reason_id: number | undefined}}>(
  'outcomes/updateOutcome',
  async (params: {id: Number, newOutcome: CreateOutcome | {amount: number, reason_id: number | undefined}}, { rejectWithValue }) => {
    try {
      nProgress.start();
      const response = await fetch(`/api/pengeluaran/update/${params.id}`, {
        method: 'POST',
        body: JSON.stringify(params.newOutcome),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      nProgress.done();

      if(!response.ok) return rejectWithValue(data.error || 'Gagal merubah pengeluaran');
      return { message: data.message };
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Terjadi kesalahan dalam menambahkan pengeluaran.');
    }
  }
);

export const deleteOutcome = createAsyncThunk<{message: string}, Number>(
  'outcomes/deleteOutcome',
  async (id: Number, { rejectWithValue }) => {
    try {
      nProgress.start();
      const response = await fetch(`/api/pengeluaran/delete/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      nProgress.done();

      if(!response.ok) return rejectWithValue(data.error || 'Gagal menghapus pengeluaran');
      return { message: data.message };
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Terjadi kesalahan dalam menambahkan pengeluaran.');
    }
  }
);