import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from '../../api/postsSlice';
import { closeEditForm } from '../../api/uiSlice';
import PrimaryButton from '../../primary-button/PrimaryButton';
import { Edit, Link, Check, Sparkles } from 'lucide-react';

const PRESETS = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1472214222541-d510753a4907?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600&q=80'
];

export default function Update() {
  const dispatch = useDispatch();
  const activeEditPostId = useSelector((state) => state.ui.activeEditPostId);
  const posts = useSelector((state) => state.posts.items);

  // Find target post
  const targetPost = posts.find((item) => item.id === activeEditPostId);

  // Form states
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Blog');
  const [category, setCategory] = useState('Photography');
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');

  // Load fields when post is loaded
  useEffect(() => {
    if (targetPost) {
      setTitle(targetPost.title || '');
      setType(targetPost.type || 'Blog');
      setCategory(targetPost.category || 'Photography');
      setImageUrl(targetPost.imageUrl || '');
      setContent(targetPost.content || '');
    }
  }, [targetPost]);

  if (!targetPost) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const updatedData = {
      id: targetPost.id,
      title,
      type,
      category,
      imageUrl: imageUrl || PRESETS[0],
      content
    };

    dispatch(updatePost(updatedData));
    dispatch(closeEditForm());
  };

  return (
    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 mb-8 text-left animate-fade-in">
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/5">
        <Edit className="text-purple-400 h-5 w-5" />
        <h2 className="text-xl font-bold text-white">Edit Post Settings</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Title */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
            Post Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm font-sans"
          />
        </div>

        {/* Two columns: Type & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
              Post Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              <option value="Blog" className="bg-[#0b0f19] text-gray-300">Blog Article</option>
              <option value="Image" className="bg-[#0b0f19] text-gray-300">Image Portfolio</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              <option value="Photography" className="bg-[#0b0f19] text-gray-300">Photography</option>
              <option value="Tech" className="bg-[#0b0f19] text-gray-300">Tech</option>
              <option value="Design" className="bg-[#0b0f19] text-gray-300">Design</option>
            </select>
          </div>
        </div>

        {/* Image Selection Presets */}
        <div className="space-y-3">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
            Select Cover Image Preset
          </label>
          
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 p-2 bg-black/20 rounded-xl border border-white/5">
            {PRESETS.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setImageUrl(src)}
                className={`relative aspect-[16/10] rounded-lg overflow-hidden border transition-all ${
                  imageUrl === src ? 'border-purple-500 scale-[0.98]' : 'border-white/5 hover:border-white/20'
                }`}
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
                {imageUrl === src && (
                  <div className="absolute inset-0 bg-purple-600/30 flex items-center justify-center">
                    <div className="h-5 w-5 bg-purple-600 rounded-full flex items-center justify-center text-white border border-white/20">
                      <Check size={12} />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
              Or Paste Image URL
            </label>
            <input
              type="text"
              placeholder="Paste direct image URL (https://...)..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-2.5 bg-black/40 border border-white/10 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 text-sm font-sans"
            />
          </div>

          {imageUrl && (
            <div className="relative aspect-[21/9] max-h-40 w-full rounded-xl overflow-hidden border border-white/5 bg-gray-900">
              <img
                src={imageUrl}
                alt="Preview"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1452780212940-6f5c0d14d84a?auto=format&fit=crop&w=600&q=80';
                }}
              />
            </div>
          )}
        </div>

        {/* Content text area */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
            Content Description
          </label>
          <textarea
            rows={6}
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm font-sans"
          />
        </div>

        {/* Form buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => dispatch(closeEditForm())}
            className="px-4 py-2.5 text-sm font-semibold text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <PrimaryButton type="submit">
            Save Changes
          </PrimaryButton>
        </div>

      </form>
    </div>
  );
}
