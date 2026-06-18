/**
 * ============================================================
 * storage.js — Centralized Secure Storage Utility
 * Human Capital Analytics Dashboard
 * ============================================================
 *
 * Provides a unified, secure interface for both localStorage
 * and sessionStorage operations across the entire application.
 *
 * SECURITY RULES:
 *  - Never store raw passwords or sensitive PII.
 *  - All writes go through sanitize() to strip XSS vectors.
 *  - Wrap every read in try/catch to handle corrupted JSON.
 */

// ─── Sanitizer ────────────────────────────────────────────────
const sanitize = (value) => {
  if (typeof value === 'string') {
    return value
      .replace(/<script.*?>.*?<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/gi, '')
      .trim();
  }
  return value;
};

// ─── localStorage — Persistent across sessions ───────────────
export const local = {
  /** Store JWT token securely */
  setToken: (token) => {
    if (!token) return;
    localStorage.setItem('hca_token', sanitize(token));
  },
  getToken: () => localStorage.getItem('hca_token') || null,
  removeToken: () => localStorage.removeItem('hca_token'),

  /** Store user theme preference */
  setTheme: (mode) => {
    if (!['light', 'dark'].includes(mode)) return;
    localStorage.setItem('hca_theme', mode);
  },
  getTheme: () => localStorage.getItem('hca_theme') || 'light',

  /** Store UI appearance preferences */
  setAppearance: (prefs) => {
    try {
      localStorage.setItem('hca_appearance', JSON.stringify(prefs));
    } catch (e) {
      console.warn('StorageError: Could not write appearance.', e);
    }
  },
  getAppearance: () => {
    try {
      const raw = localStorage.getItem('hca_appearance');
      return raw ? JSON.parse(raw) : { animations: true, density: 'comfortable', glassIntensity: 60, neumorphism: true };
    } catch {
      return { animations: true, density: 'comfortable', glassIntensity: 60, neumorphism: true };
    }
  },

  /** Store lightweight user session data (non-sensitive) */
  setUserSession: (user) => {
    try {
      // Only store non-sensitive fields — never store passwords
      const safeUser = {
        id: user._id || user.id,
        name: sanitize(user.name),
        email: sanitize(user.email),
        role: sanitize(user.role),
      };
      localStorage.setItem('hca_session', JSON.stringify(safeUser));
    } catch (e) {
      console.warn('StorageError: Could not write user session.', e);
    }
  },
  getUserSession: () => {
    try {
      const raw = localStorage.getItem('hca_session');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.warn('StorageError: Corrupted user session data. Clearing.', e);
      localStorage.removeItem('hca_session');
      return null;
    }
  },

  /** Clear all app-related keys on logout */
  clearAll: () => {
    ['hca_token', 'hca_theme', 'hca_session', 'hca_appearance'].forEach((key) => localStorage.removeItem(key));
  },
};

// ─── sessionStorage — Temporary, cleared on tab close ────────
export const session = {
  /** Store temporary filter state (e.g., DataListing search + category) */
  setFilters: (filters) => {
    try {
      sessionStorage.setItem('hca_filters', JSON.stringify(filters));
    } catch (e) {
      console.warn('StorageError: Could not write filters.', e);
    }
  },
  getFilters: () => {
    try {
      const raw = sessionStorage.getItem('hca_filters');
      return raw ? JSON.parse(raw) : null;
    } catch {
      sessionStorage.removeItem('hca_filters');
      return null;
    }
  },
  clearFilters: () => sessionStorage.removeItem('hca_filters'),

  /** Store multi-step form progress so it survives accidental navigation */
  setFormProgress: (formId, data) => {
    try {
      sessionStorage.setItem(`hca_form_${formId}`, JSON.stringify(data));
    } catch (e) {
      console.warn('StorageError: Could not save form progress.', e);
    }
  },
  getFormProgress: (formId) => {
    try {
      const raw = sessionStorage.getItem(`hca_form_${formId}`);
      return raw ? JSON.parse(raw) : null;
    } catch {
      sessionStorage.removeItem(`hca_form_${formId}`);
      return null;
    }
  },
  clearFormProgress: (formId) => sessionStorage.removeItem(`hca_form_${formId}`),

  /** Clear all temporary session state */
  clearAll: () => {
    Object.keys(sessionStorage)
      .filter((k) => k.startsWith('hca_'))
      .forEach((k) => sessionStorage.removeItem(k));
  },
};
