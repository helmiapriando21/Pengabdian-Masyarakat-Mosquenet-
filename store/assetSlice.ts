import { ListAset } from '@/interface/aset';
import { createSlice } from '@reduxjs/toolkit';
import { createAssets, deleteAsset, fetchAssets, updateAsset } from '@/action/assetAction';
import notificationAlert from '@/services/notificationAlert';


const assetSlice = createSlice({
  name: 'assets',
  initialState: {
    items: undefined as ListAset[] | undefined,
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
      .addCase(fetchAssets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(createAssets.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAssets.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(createAssets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string
        notificationAlert(action.payload as string, 'error', () => {});
      })
      .addCase(updateAsset.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAsset.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(updateAsset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        notificationAlert(action.payload as string, 'error', () => {});
      })
      .addCase(deleteAsset.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAsset.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(deleteAsset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        notificationAlert(action.payload as string, 'error', () => {});
      })
  }
});

export const { clearMessage, clearError } = assetSlice.actions;
export default assetSlice.reducer;