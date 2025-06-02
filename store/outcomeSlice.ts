import { createSlice } from '@reduxjs/toolkit';
import notificationAlert from '@/services/notificationAlert';
import { OutcomeData } from '@/interface/report';
import { SelectType } from '@/interface/form';
import { 
  addReason, 
  createOutcome, 
  fetchOutcomes, 
  fetchReasons 
} from '@/thunks/outcomeThunks';


const incomeSlice = createSlice({
  name: 'incomes',
  initialState: {
    outcomes: undefined as OutcomeData[] | undefined,
    reasons: undefined as SelectType[] | undefined,
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
      .addCase(fetchOutcomes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOutcomes.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.outcomes = action.payload;
      })
      .addCase(fetchOutcomes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(fetchReasons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReasons.fulfilled, (state, action) => {
        state.loading = false;
        state.reasons = action.payload;
      })
      .addCase(fetchReasons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(addReason.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReason.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(addReason.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        notificationAlert(action.payload as string, 'error', () => {});
      })
      .addCase(createOutcome.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOutcome.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(createOutcome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        notificationAlert(action.payload as string, 'error', () => {});
      })
  }
});

export const { clearMessage, clearError } = incomeSlice.actions;
export default incomeSlice.reducer;