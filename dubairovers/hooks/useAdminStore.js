'use client';
import { useState, useEffect, useCallback } from 'react';

// ─── Generic localStorage hook ────────────────────────────────────
export function useLocalStore(key, initialData) {
  const [data, setData] = useState(initialData);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`dr_admin_${key}`);
      if (stored) setData(JSON.parse(stored));
    } catch {}
    setLoaded(true);
  }, [key]);

  const save = useCallback((newData) => {
    const updated = typeof newData === 'function' ? newData(data) : newData;
    setData(updated);
    try {
      localStorage.setItem(`dr_admin_${key}`, JSON.stringify(updated));
      // Broadcast to other tabs/windows
      window.dispatchEvent(new CustomEvent('dr_data_update', { detail: { key, data: updated } }));
    } catch {}
    return updated;
  }, [key, data]);

  const add = useCallback((item) => {
    return save(prev => [{ ...item, id: item.id || `${key}-${Date.now()}` }, ...prev]);
  }, [save, key]);

  const update = useCallback((id, changes) => {
    return save(prev => prev.map(item => item.id === id ? { ...item, ...changes } : item));
  }, [save]);

  const remove = useCallback((id) => {
    return save(prev => prev.filter(item => item.id !== id));
  }, [save]);

  return { data, save, add, update, remove, loaded };
}

// ─── Toast notification ───────────────────────────────────────────
export function useToast() {
  const [toasts, setToasts] = useState([]);

  const show = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  }, []);

  const ToastContainer = () => (
    <div className="fixed top-4 right-4 z-[200] space-y-2">
      {toasts.map(toast => (
        <div key={toast.id}
          className="flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg font-semibold text-sm animate-slide-up"
          style={{
            background: toast.type === 'success' ? '#10B981' : toast.type === 'error' ? '#EF4444' : '#D4AF37',
            color: '#fff',
          }}>
          <span>{toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : 'ℹ️'}</span>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );

  return { show, ToastContainer };
}
