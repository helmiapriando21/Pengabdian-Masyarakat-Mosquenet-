import { createAsyncThunk } from '@reduxjs/toolkit';
import nProgress from 'nprogress';

export const fetchFeedback = createAsyncThunk(
  'feedback/fetchFeedback',
  async (_, { rejectWithValue }) => {
    try {
      nProgress.start();
      const response = await fetch('/api/master/critics');
      const data = await response.json();
      nProgress.done();
      return data.critics;
    } catch (err) {
      nProgress.done();
      return rejectWithValue('Gagal mengambil pengaturan sistem');
    }
  }
);