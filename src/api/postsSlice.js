import { createSlice } from '@reduxjs/toolkit';

const getStoredPosts = () => {
  try {
    const serialized = localStorage.getItem('blog_pro_posts');
    if (serialized) {
      return JSON.parse(serialized);
    }
  } catch (e) {
    console.error('Error reading posts from localStorage:', e);
  }
  return [];
};

const savePostsToStorage = (items) => {
  try {
    localStorage.setItem('blog_pro_posts', JSON.stringify(items));
  } catch (e) {
    console.error('Error saving posts to localStorage:', e);
  }
};

const defaultMockPosts = [
  {
    id: 'mock_1',
    title: 'Echoes of Light: Architectural Shadows in Tokyo',
    type: 'Image',
    category: 'Photography',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    content: 'Capturing the geometry of Brutalist stairwells in downtown Tokyo under peak noon sunlight. The hard contrast between raw concrete and deep shadow outlines the silent beauty of city architecture.'
  },
  {
    id: 'mock_2',
    title: 'Crafting Glassmorphic UIs: The Aesthetic Paradigm of 2026',
    type: 'Blog',
    category: 'Design',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    content: 'Designing digital interfaces that feel tactile and transparent has become a core pursuit of modern UI/UX design. Glassmorphism combines soft backdrop blurs with subtle borders to recreate frosted glass layers.\n\n## The Geometry of Transparency\n\nTo make glass look realistic, you must combine multiple visual factors: a semi-transparent background color, high-density backdrop-filter, thin white borders representing highlights, and drop shadows to establish spatial depth.'
  },
  {
    id: 'mock_3',
    title: 'Future of Edge Computing: Decentralized Cloud Microgrids',
    type: 'Blog',
    category: 'Tech',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    content: 'As data demands scale exponentially, routing packets through giant centralized data centers introduces latency bottle-necks. Edge cloud microgrids decentralize calculations, running servers right at local nodes.\n\n## Low Latency & High Resilience\n\nBy executing pipelines close to local networks, autonomous driving, smart cities, and virtual reality achieve sub-millisecond response speeds.'
  },
  {
    id: 'mock_4',
    title: 'Golden Hour Silhouettes Over the Swedish Archipelago',
    type: 'Image',
    category: 'Photography',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    content: 'Golden light reflecting off Sweden’s cold Baltic waters. The silhouette of pine branches frames a small fishing vessel sailing into the setting sun.'
  }
];

const initialItems = getStoredPosts();
const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: initialItems.length > 0 ? initialItems : defaultMockPosts,
    searchQuery: ''
  },
  reducers: {
    addPost: {
      reducer: (state, action) => {
        state.items.unshift(action.payload);
        savePostsToStorage(state.items);
      },
      prepare: (post) => {
        return {
          payload: {
            ...post,
            id: 'local_' + Date.now() + Math.random().toString(36).substr(2, 5)
          }
        };
      }
    },
    updatePost: (state, action) => {
      const updatedPost = action.payload;
      const index = state.items.findIndex(item => item.id === updatedPost.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...updatedPost };
        savePostsToStorage(state.items);
      }
    },
    deletePost: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      savePostsToStorage(state.items);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    }
  }
});

export const { addPost, updatePost, deletePost, setSearchQuery } = postsSlice.actions;
export default postsSlice.reducer;
