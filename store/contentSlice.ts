import { createSlice } from '@reduxjs/toolkit';
import notificationAlert from '@/services/notificationAlert';
import { ListContent } from '@/interface/content';
import { createContent, deleteContent, fetchContent, fetchContents, updateContent } from '@/thunks/contentThunks';


const contentSlice = createSlice({
  name: 'contents',
  initialState: {
    contents: [] as ListContent[],
    content: null as ListContent | null,
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
    clearContent(state) {
      state.content = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContents.fulfilled, (state, action) => {
        state.loading = false;
        state.contents = action.payload;
      })
      .addCase(fetchContents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(fetchContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.loading = false;
        state.content = action.payload;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(createContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(createContent.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(createContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string
        notificationAlert(action.payload as string, 'error', () => {});
      })
      .addCase(updateContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateContent.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(updateContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        notificationAlert(action.payload as string, 'error', () => {});
      })
      .addCase(deleteContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteContent.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(deleteContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        notificationAlert(action.payload as string, 'error', () => {});
      })
  }
});

export const { clearMessage, clearError, clearContent } = contentSlice.actions;
export default contentSlice.reducer;