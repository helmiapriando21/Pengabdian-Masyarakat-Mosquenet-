import { createSlice } from '@reduxjs/toolkit';
import { ListMosque } from '@/interface/mosque';
import { fetchMosques, verifyMosque } from '@/thunks/mosqueThunks';
import notificationAlert from '@/services/notificationAlert';


const mosqueSlice = createSlice({
  name: 'mosque',
  initialState: {
    mosques: undefined as ListMosque[] | undefined,
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMosques.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMosques.fulfilled, (state, action) => {
        state.loading = false;
        state.mosques = action.payload;
      })
      .addCase(fetchMosques.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(verifyMosque.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyMosque.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(verifyMosque.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        notificationAlert(action.payload as string, 'error', () => {});
      })
      // .addCase(deleteAsset.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(deleteAsset.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.message = action.payload.message;
      // })
      // .addCase(deleteAsset.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload as string;
      //   notificationAlert(action.payload as string, 'error', () => {});
      // })
  }
});

export const { clearMessage, clearError } = mosqueSlice.actions;
export default mosqueSlice.reducer;