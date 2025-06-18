import { createSlice } from '@reduxjs/toolkit';
import notificationAlert from '@/services/notificationAlert';
import { IncomeData } from '@/interface/report';
import { SelectType } from '@/interface/form';
import { 
  addSource, 
  createIncome, 
  fetchIncomes, 
  fetchSources 
} from '@/action/incomeAction';
import { AdminDonationDisplay } from '@/interface/bank';


const incomeSlice = createSlice({
  name: 'incomes',
  initialState: {
    incomes: undefined as IncomeData[] | undefined,
    donations: undefined as AdminDonationDisplay[] | undefined,
    sources: undefined as SelectType[] | undefined,
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
      .addCase(fetchIncomes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIncomes.fulfilled, (state, action) => {
        state.loading = false;
        state.incomes = action.payload.incomes;
        state.donations = action.payload.donations;
      })
      .addCase(fetchIncomes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(fetchSources.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSources.fulfilled, (state, action) => {
        state.loading = false;
        state.sources = action.payload;
      })
      .addCase(fetchSources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(addSource.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSource.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(addSource.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        notificationAlert(action.payload as string, 'error', () => {});
      })
      .addCase(createIncome.pending, (state) => {
        state.loading = true;
      })
      .addCase(createIncome.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(createIncome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        notificationAlert(action.payload as string, 'error', () => {});
      })
  }
});

export const { clearMessage, clearError } = incomeSlice.actions;
export default incomeSlice.reducer;