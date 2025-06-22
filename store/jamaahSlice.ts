import { createSlice } from '@reduxjs/toolkit';
import notificationAlert from '@/services/notificationAlert';
import { Jamaah } from '@/interface/jamaah';
import { fetchJamaah, updateRole, verifyJamaah } from '@/action/jamaahAction';


const jamaahSlice = createSlice({
  name: 'jamaah',
  initialState: {
    jamaah: undefined as Jamaah[] | undefined,
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
      .addCase(fetchJamaah.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJamaah.fulfilled, (state, action) => {
        state.loading = false;
        state.jamaah = action.payload;
      })
      .addCase(fetchJamaah.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(verifyJamaah.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyJamaah.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(verifyJamaah.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        notificationAlert(action.payload as string, 'error', () => {});
      })
      .addCase(updateRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        notificationAlert(action.payload as string, 'error', () => {});
      })
  }
});

export const { clearMessage, clearError } = jamaahSlice.actions;
export default jamaahSlice.reducer;