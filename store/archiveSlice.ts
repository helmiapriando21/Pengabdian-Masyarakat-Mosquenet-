import { createSlice } from '@reduxjs/toolkit';
import notificationAlert from '@/services/notificationAlert';
import { ArchiveDocuments, ArchiveTemplates } from '@/interface/archive';
import { 
  createDocument, 
  createTemplate, 
  deleteDocument, 
  deleteTemplate, 
  fetchDocuments, 
  fetchTemplates, 
  updateDocument, 
  updateTemplate 
} from '@/thunks/archiveThunks';


const archiveSlice = createSlice({
  name: 'contents',
  initialState: {
    documents: [] as ArchiveDocuments[],
    templates: [] as ArchiveTemplates[],
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
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = action.payload;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(fetchTemplates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        state.loading = false;
        state.templates = action.payload;
      })
      .addCase(fetchTemplates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(createDocument.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(createDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string
        notificationAlert(action.payload as string, 'error', () => {});
      })
      .addCase(createTemplate.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTemplate.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(createTemplate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string
        notificationAlert(action.payload as string, 'error', () => {});
      })
      .addCase(updateDocument.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(updateDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        notificationAlert(action.payload as string, 'error', () => {});
      })
      .addCase(updateTemplate.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTemplate.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(updateTemplate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        notificationAlert(action.payload as string, 'error', () => {});
      })
      .addCase(deleteDocument.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(deleteDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        notificationAlert(action.payload as string, 'error', () => {});
      })
      .addCase(deleteTemplate.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTemplate.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(deleteTemplate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        notificationAlert(action.payload as string, 'error', () => {});
      })
  }
});

export const { clearMessage, clearError } = archiveSlice.actions;
export default archiveSlice.reducer;