import { ReportData } from '@/interface/report';
import { createAsyncThunk } from '@reduxjs/toolkit';
import nProgress from 'nprogress';

export const fetchDashboard = createAsyncThunk(
  'dashboard/fetchDashboard',
  async (_, { rejectWithValue }) => {
    try {
      nProgress.start();
      const response = await fetch('/api/dashboard');
      const data = await response.json();
      nProgress.done();
      return {
        report: data.report,
        pemasukan: data.pemasukan,
        pengeluaran: data.pengeluaran,
        aset: data.aset
      };
    } catch (err) {
        console.error("Error: ", err);
    }
  }
);

export const fetchReport = createAsyncThunk<ReportData[], string>(
  'dashboard/fetchReport',
  async (id: string, { rejectWithValue }) => {
    try {
      nProgress.start();
      const response = await fetch(`/api/mosques/laporan/${id}`);
      const data = await response.json();
      nProgress.done();
      return data.reports;
    } catch (err) {
        console.error("Error: ", err);
    }
  }
);