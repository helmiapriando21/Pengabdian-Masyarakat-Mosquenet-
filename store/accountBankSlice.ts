import { createSlice } from '@reduxjs/toolkit';
import { SelectType } from '@/interface/form';
import { ListBank } from '@/interface/bank';
import { addPurpose, createAccountBank, fetchAccountBank, fetchDonationBank, fetchPurposesAccountBank } from '@/thunks/accountBankThunks';
import notificationAlert from '@/services/notificationAlert';


const accountBankSlice = createSlice({
  name: 'incomes',
  initialState: {
    accountBanks: undefined as ListBank[] | undefined,
    accountBank: null as ListBank | null,
    purposes: undefined as SelectType[] | undefined,
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
    clearAccountBank(state) {
      state.accountBank = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountBank.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAccountBank.fulfilled, (state, action) => {
        state.loading = false;
        state.accountBanks = action.payload;
      })
      .addCase(fetchAccountBank.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(fetchDonationBank.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDonationBank.fulfilled, (state, action) => {
        state.loading = false;
        state.accountBank = action.payload;
      })
      .addCase(fetchDonationBank.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(fetchPurposesAccountBank.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPurposesAccountBank.fulfilled, (state, action) => {
        state.loading = false;
        state.purposes = action.payload;
      })
      .addCase(fetchPurposesAccountBank.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(addPurpose.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPurpose.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(addPurpose.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        notificationAlert(action.payload as string, 'error', () => {});
      })
      .addCase(createAccountBank.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAccountBank.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(createAccountBank.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        notificationAlert(action.payload as string, 'error', () => {});
      })
  }
});

export const { clearMessage, clearError, clearAccountBank } = accountBankSlice.actions;
export default accountBankSlice.reducer;