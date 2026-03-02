export const safeStorage = {
  get(key) {
    try {
      if (typeof localStorage === 'undefined') return null;
      const value = localStorage.getItem(key);
      if (!value) return null;
      const trimmed = value.trim();
      if (!trimmed || trimmed === 'null' || trimmed === 'undefined') return null;
      return trimmed;
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      if (typeof localStorage === 'undefined') return;
      localStorage.setItem(key, value);
    } catch {
      // ignore storage errors (privacy mode, blocked storage, etc.)
    }
  },
  remove(key) {
    try {
      if (typeof localStorage === 'undefined') return;
      localStorage.removeItem(key);
    } catch {
      // ignore storage errors (privacy mode, blocked storage, etc.)
    }
  }
};
