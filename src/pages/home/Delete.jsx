import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../api/postsSlice';
import { AlertTriangle, Trash2 } from 'lucide-react';

export default function Delete({ postId, title, onCancel }) {
  const dispatch = useDispatch();

  const handleConfirmDelete = () => {
    dispatch(deletePost(postId));
    onCancel(); // Close deletion notification
  };

  return (
    <div className="p-4 bg-red-950/20 border border-red-500/15 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in mb-6 text-left">
      <div className="flex items-start gap-3">
        <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={20} />
        <div>
          <h4 className="text-sm font-bold text-white">Delete Content Warning</h4>
          <p className="text-xs text-red-200/80 mt-1 leading-relaxed">
            Are you sure you want to permanently delete <strong className="text-white">"{title}"</strong>? This action cannot be undone.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
        <button
          onClick={onCancel}
          className="px-3.5 py-1.5 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirmDelete}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-lg transition-colors shadow-md shadow-red-600/15"
        >
          <Trash2 size={13} />
          Permanently Delete
        </button>
      </div>
    </div>
  );
}
