import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeReader } from '../../api/uiSlice';
import { ArrowLeft, BookOpen, Layers } from 'lucide-react';

export default function Read() {
  const dispatch = useDispatch();
  const activeReaderPostId = useSelector((state) => state.ui.activeReaderPostId);
  const posts = useSelector((state) => state.posts.items);

  const post = posts.find((item) => item.id === activeReaderPostId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeReaderPostId]);

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center font-sans">
        <p className="text-gray-400">Post not found or has been deleted.</p>
        <button
          onClick={() => dispatch(closeReader())}
          className="mt-4 px-4 py-2 bg-purple-600 rounded-lg text-white font-semibold text-sm"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <article className="min-h-screen text-gray-100 font-sans pb-20 animate-fade-in text-left">
      
      {/* Action Bar */}
      <div className="border-b border-white/5 bg-black/40 py-3.5 sticky top-16 z-20 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-4 flex items-center justify-between">
          <button
            onClick={() => dispatch(closeReader())}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-white uppercase tracking-wider transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>
          
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/15">
            {post.type}
          </span>
        </div>
      </div>

      {/* Hero Media (Full Width Banner) */}
      {post.imageUrl && (
        <div className="w-full max-w-4xl mx-auto px-0 sm:px-4 mt-6">
          <div className="relative overflow-hidden aspect-[21/9] sm:rounded-2xl border border-white/5 bg-gray-900 shadow-2xl">
            <img
              src={post.imageUrl}
              alt={post.title}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>
        </div>
      )}

      {/* Reading container */}
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 mt-10">
        
        {/* Post Metadata Header */}
        <header className="space-y-4 pb-8 border-b border-white/5">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-400 tracking-widest uppercase">
            <Layers size={12} />
            {post.category}
          </span>
          
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight sm:leading-none font-sans">
            {post.title}
          </h1>
        </header>

        {/* Content Body */}
        <section className="mt-8 prose prose-invert max-w-none text-gray-300 font-serif leading-relaxed text-lg space-y-6">
          {post.content ? (
            post.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.trim().startsWith('###')) {
                return (
                  <h3 key={index} className="text-xl font-bold text-white font-sans tracking-wide pt-4 pb-1">
                    {paragraph.replace('###', '').trim()}
                  </h3>
                );
              }
              if (paragraph.trim().startsWith('##')) {
                return (
                  <h2 key={index} className="text-2xl font-bold text-white font-sans tracking-wide pt-6 pb-2 border-b border-white/5">
                    {paragraph.replace('##', '').trim()}
                  </h2>
                );
              }
              return (
                <p key={index} className="font-light text-gray-300">
                  {paragraph.trim()}
                </p>
              );
            })
          ) : (
            <p className="italic text-gray-500 font-sans">No text content available.</p>
          )}
        </section>

        {/* Action Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center">
          <button
            onClick={() => dispatch(closeReader())}
            className="flex items-center gap-1.5 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-xs font-bold text-gray-300 hover:text-white uppercase tracking-wider transition-all"
          >
            <ArrowLeft size={14} />
            Back to Dashboard
          </button>
        </div>

      </div>
    </article>
  );
}
