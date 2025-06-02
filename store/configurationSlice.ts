import { createSlice } from '@reduxjs/toolkit';
import notificationAlert from '@/services/notificationAlert';
import { Configuration } from '@/interface/configuration';
import { changeConfiguration, fetchConfiguration } from '@/thunks/configurationThunks';


const configurationSlice = createSlice({
  name: 'config',
  initialState: {
    configuration: null as Configuration | null,
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
      .addCase(fetchConfiguration.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConfiguration.fulfilled, (state, action) => {
        state.loading = false;
        state.configuration = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchConfiguration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(changeConfiguration.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeConfiguration.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(changeConfiguration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        notificationAlert(action.payload as string, 'error', () => {});
      })
  }
});

export const { clearMessage, clearError } = configurationSlice.actions;
export default configurationSlice.reducer;