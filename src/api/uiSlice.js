import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    currentPage: 'home', // 'home' | 'about'
    activeReaderPostId: null, // ID of post currently being read
    activeEditPostId: null, // ID of post currently being edited
    isCreateOpen: false, // Whether the inline Create form card is visible
    isEditOpen: false // Whether the inline Update form card is visible
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
      state.activeReaderPostId = null;
      state.isCreateOpen = false;
      state.isEditOpen = false;
      state.activeEditPostId = null;
    },
    openReader: (state, action) => {
      state.activeReaderPostId = action.payload;
      state.isCreateOpen = false;
      state.isEditOpen = false;
    },
    closeReader: (state) => {
      state.activeReaderPostId = null;
    },
    toggleCreateForm: (state) => {
      state.isCreateOpen = !state.isCreateOpen;
      state.isEditOpen = false;
      state.activeReaderPostId = null;
      state.activeEditPostId = null;
    },
    openEditForm: (state, action) => {
      state.activeEditPostId = action.payload;
      state.isEditOpen = true;
      state.isCreateOpen = false;
      state.activeReaderPostId = null;
    },
    closeEditForm: (state) => {
      state.isEditOpen = false;
      state.activeEditPostId = null;
    }
  }
});

export const {
  setPage,
  openReader,
  closeReader,
  toggleCreateForm,
  openEditForm,
  closeEditForm
} = uiSlice.actions;

export default uiSlice.reducer;
