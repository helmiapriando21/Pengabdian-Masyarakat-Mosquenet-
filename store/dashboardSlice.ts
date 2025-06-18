import { createSlice } from '@reduxjs/toolkit';
import { ReportData } from '@/interface/report';
import { AsetDashboard } from '@/interface/aset';
import { fetchDashboard, fetchReport } from '@/action/dashboardAction';


const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    report: undefined as ReportData[] | undefined,
    pemasukan: undefined as number | undefined,
    pengeluaran: undefined as number | undefined,
    aset: undefined as AsetDashboard | undefined,
    loading: false,
    error: null as string | null,
    message: null as string | null
  },
  reducers: {
    clearMessage(state) {
      state.message = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload;
        state.report = data!.report;
        state.pemasukan = data!.pemasukan;
        state.pengeluaran = data!.pengeluaran;
        state.aset = data!.aset;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(fetchReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload;
      })
      .addCase(fetchReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
  }
});

export const { clearMessage, clearError } = dashboardSlice.actions;
export default dashboardSlice.reducer;