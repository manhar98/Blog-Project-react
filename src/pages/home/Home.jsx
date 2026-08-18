import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../../api/postsSlice';
import { openReader, openEditForm, toggleCreateForm } from '../../api/uiSlice';
import Create from './Create';
import Update from './Update';
import Read from './Read';
import Delete from './Delete';
import IconButton from '../../primary-button/IconButton';
import { Search, Eye, Edit2, Trash2, Database, FileText, Image as ImageIcon, Sparkles } from 'lucide-react';

export default function Home() {
  const dispatch = useDispatch();
  const { items, searchQuery } = useSelector((state) => state.posts);
  const { isCreateOpen, isEditOpen, activeReaderPostId } = useSelector((state) => state.ui);

  // Local state for delete confirmation target
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Filter based on search query
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Delete target details
  const deleteTargetPost = items.find((item) => item.id === deleteTargetId);

  // Compute metrics
  const totalCount = items.length;
  const blogCount = items.filter((item) => item.type === 'Blog').length;
  const imageCount = items.filter((item) => item.type === 'Image').length;

  // If reading view is active, render Read view exclusively
  if (activeReaderPostId) {
    return <Read />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-sans">
      
      {/* Title Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-6 text-left">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
            Creator Studio
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 font-light">
            Manage your personal portfolio images, blog articles, and content layouts.
          </p>
        </div>

        {/* Global Search */}
        <div className="flex items-center gap-3">
          {/* Quick Search */}
          <div className="relative flex-1 sm:w-64">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              <Search size={14} />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              placeholder="Search library..."
              className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-medium"
            />
          </div>
        </div>
      </div>

      {/* Inline Forms Container */}
      {isCreateOpen && <Create />}
      {isEditOpen && <Update />}

      {/* Delete confirmation banner */}
      {deleteTargetId && deleteTargetPost && (
        <Delete
          postId={deleteTargetId}
          title={deleteTargetPost.title}
          onCancel={() => setDeleteTargetId(null)}
        />
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl glass border border-white/5 flex items-center gap-4 hover:border-purple-500/20 transition-all text-left">
          <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400">
            <Database size={18} />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block">Total Items</span>
            <span className="text-xl font-extrabold text-white font-mono mt-0.5 block">{totalCount}</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass border border-white/5 flex items-center gap-4 hover:border-purple-500/20 transition-all text-left">
          <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400">
            <FileText size={18} />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block">Blog Articles</span>
            <span className="text-xl font-extrabold text-white font-mono mt-0.5 block">{blogCount}</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass border border-white/5 flex items-center gap-4 hover:border-purple-500/20 transition-all text-left">
          <div className="h-10 w-10 rounded-xl bg-green-500/10 border border-green-500/25 flex items-center justify-center text-green-400">
            <ImageIcon size={18} />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block">Portfolio Images</span>
            <span className="text-xl font-extrabold text-white font-mono mt-0.5 block">{imageCount}</span>
          </div>
        </div>
      </div>

      {/* Main Database Table */}
      <div className="w-full">
        <div className="overflow-x-auto rounded-xl border border-white/5 bg-white/[0.01]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02] text-xs font-bold uppercase tracking-wider text-gray-400">
                <th className="p-4">Title</th>
                <th className="p-4 w-28">Type</th>
                <th className="p-4 w-32">Category</th>
                <th className="p-4 w-36 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm text-gray-300">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-gray-500 italic">
                    No matching publications found. Add some content above to begin!
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Image Thumbnail & Title */}
                    <td className="p-4 font-semibold text-white">
                      <div className="flex items-center gap-3">
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt=""
                            className="h-10 w-10 rounded-lg object-cover border border-white/10 shrink-0"
                          />
                        )}
                        <span
                          onClick={() => dispatch(openReader(item.id))}
                          className="hover:text-purple-400 cursor-pointer hover:underline transition-colors block text-sm font-medium truncate max-w-xs sm:max-w-md"
                        >
                          {item.title}
                        </span>
                      </div>
                    </td>

                    {/* Type Badge */}
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          item.type === 'Blog'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/15'
                            : 'bg-green-500/10 text-green-400 border border-green-500/15'
                        }`}
                      >
                        {item.type === 'Blog' ? <FileText size={10} /> : <ImageIcon size={10} />}
                        {item.type}
                      </span>
                    </td>

                    {/* Category Label */}
                    <td className="p-4 text-xs text-purple-300 font-semibold tracking-wider uppercase font-sans">
                      {item.category}
                    </td>

                    {/* Action buttons */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <IconButton
                          icon={Eye}
                          onClick={() => dispatch(openReader(item.id))}
                          title="Preview Content"
                        />
                        <IconButton
                          icon={Edit2}
                          onClick={() => dispatch(openEditForm(item.id))}
                          variant="default"
                          title="Edit Post"
                        />
                        <IconButton
                          icon={Trash2}
                          onClick={() => setDeleteTargetId(item.id)}
                          variant="danger"
                          title="Delete Post"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
