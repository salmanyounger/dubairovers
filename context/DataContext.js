'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { TOURS as STATIC_TOURS, TOUR_CATEGORIES } from '../data/tours';
import { BLOG_META as ALL_BLOGS } from '../data/blog_database';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [tours,  setTours]  = useState(STATIC_TOURS);
  const [blogs,  setBlogs]  = useState(ALL_BLOGS);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount (admin overrides)
  useEffect(() => {
    try {
      const st = localStorage.getItem('dr_admin_tours');
      if (st) { const p = JSON.parse(st); if (Array.isArray(p) && p.length > 0) setTours(p); }
    } catch {}
    try {
      const sb = localStorage.getItem('dr_admin_blog_posts');
      if (sb) { const p = JSON.parse(sb); if (Array.isArray(p) && p.length > 0) setBlogs(p); }
    } catch {}
    setLoaded(true);
  }, []);

  // Listen for admin publish events (same tab + cross-tab)
  useEffect(() => {
    const handler = (e) => {
      try {
        if (e.type === 'dr_data_update') {
          if (e.detail?.key === 'tours' && Array.isArray(e.detail.data)) setTours(e.detail.data);
          if (e.detail?.key === 'blog_posts' && Array.isArray(e.detail.data)) setBlogs(e.detail.data);
        }
        if (e.type === 'storage') {
          if (e.key === 'dr_admin_tours' && e.newValue) { const p = JSON.parse(e.newValue); if (Array.isArray(p)) setTours(p); }
          if (e.key === 'dr_admin_blog_posts' && e.newValue) { const p = JSON.parse(e.newValue); if (Array.isArray(p)) setBlogs(p); }
        }
      } catch {}
    };
    window.addEventListener('dr_data_update', handler);
    window.addEventListener('storage', handler);
    return () => { window.removeEventListener('dr_data_update', handler); window.removeEventListener('storage', handler); };
  }, []);

  // Publish scheduled blogs automatically
  useEffect(() => {
    const check = () => {
      const now = new Date();
      let updated = false;
      const newBlogs = blogs.map(b => {
        if (b.status === 'scheduled' && b.publishAt && new Date(b.publishAt) <= now) {
          updated = true;
          return { ...b, status:'published', publishedAt: b.publishAt.split('T')[0] };
        }
        return b;
      });
      if (updated) { setBlogs(newBlogs); try { localStorage.setItem('dr_admin_blog_posts', JSON.stringify(newBlogs)); } catch {} }
    };
    check();
    const id = setInterval(check, 60000);
    return () => clearInterval(id);
  }, [blogs]);

  const getFeaturedTours  = useCallback(() => tours.filter(t => t.featured),  [tours]);
  const getTrendingTours  = useCallback(() => tours.filter(t => t.trending),  [tours]);
  const getToursByCategory= useCallback((cat) => tours.filter(t => t.category === cat), [tours]);
  const getTour           = useCallback((slug) => tours.find(t => t.slug === slug),      [tours]);

  // Only show published blogs on the visitor site
  const publishedBlogs = blogs.filter(b => b.status === 'published' || (!b.status && b.publishedAt));

  return (
    <DataContext.Provider value={{
      tours, blogs: publishedBlogs, allBlogs: blogs, loaded,
      categories: TOUR_CATEGORIES,
      getTour, getToursByCategory, getFeaturedTours, getTrendingTours,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) return {
    tours: STATIC_TOURS,
    blogs: ALL_BLOGS.filter(b => b.status === 'published'),
    allBlogs: ALL_BLOGS, loaded: true, categories: TOUR_CATEGORIES,
    getTour: (s) => STATIC_TOURS.find(t => t.slug === s),
    getToursByCategory: (c) => STATIC_TOURS.filter(t => t.category === c),
    getFeaturedTours: () => STATIC_TOURS.filter(t => t.featured),
    getTrendingTours: () => STATIC_TOURS.filter(t => t.trending),
  };
  return ctx;
}
