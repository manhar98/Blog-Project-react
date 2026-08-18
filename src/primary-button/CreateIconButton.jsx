import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCreateForm } from '../api/uiSlice';
import { Plus, X } from 'lucide-react';

export default function CreateIconButton({ className = '' }) {
  const dispatch = useDispatch();
  const isCreateOpen = useSelector((state) => state.ui.isCreateOpen);

  return (
    <button
      onClick={() => dispatch(toggleCreateForm())}
      className={`flex items-center justify-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl active:scale-95 transition-all duration-200 border ${
        isCreateOpen
          ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
          : 'bg-purple-600 hover:bg-purple-700 text-white border-purple-500/20 shadow-lg shadow-purple-600/10'
      } ${className}`}
      title={isCreateOpen ? 'Close Editor' : 'Create New Post'}
    >
      {isCreateOpen ? <X size={16} /> : <Plus size={16} />}
      <span>{isCreateOpen ? 'Cancel' : 'New Content'}</span>
    </button>
  );
}
