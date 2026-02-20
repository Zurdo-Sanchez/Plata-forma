export const safeStorage = {
  get(key) {
    try {
      if (typeof localStorage === 'undefined') return null;
      return localStorage.getItem(key);
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
