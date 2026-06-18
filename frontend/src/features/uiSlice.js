import { createSlice, current } from '@reduxjs/toolkit';
import { local } from '../services/storage';

const getStoredJSON = (key, defaults) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...defaults, ...JSON.parse(raw) } : { ...defaults };
  } catch { return { ...defaults }; }
};

const DEFAULT_NOTIFS = {
  email: true, analytics: true, warnings: true, reports: false,
  aiInsights: true, weeklyDigest: false,
};

const DEFAULT_AIPREFS = {
  predictions: true, recommendations: true,
  autoReports: false, telemetry: true, smartInsights: true,
};

const initialState = {
  themeMode: local.getTheme(),
  sidebarOpen: false,
  appearance: local.getAppearance(),
  notifs: getStoredJSON('hca_notifs', DEFAULT_NOTIFS),
  aiPrefs: getStoredJSON('hca_aiprefs', DEFAULT_AIPREFS),
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
      local.setTheme(state.themeMode);
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    updateAppearance: (state, action) => {
      state.appearance = { ...state.appearance, ...action.payload };
      local.setAppearance(state.appearance);
    },
    toggleNotif: (state, action) => {
      const key = action.payload;
      if (key in state.notifs) {
        state.notifs[key] = !state.notifs[key];
        // Use current() to extract plain object from Immer draft before serializing
        try { localStorage.setItem('hca_notifs', JSON.stringify(current(state.notifs))); } catch { /* ignore */ }
      }
    },
    toggleAiPref: (state, action) => {
      const key = action.payload;
      if (key in state.aiPrefs) {
        state.aiPrefs[key] = !state.aiPrefs[key];
        try { localStorage.setItem('hca_aiprefs', JSON.stringify(current(state.aiPrefs))); } catch { /* ignore */ }
      }
    },
  },
});

export const {
  toggleTheme, toggleSidebar, setSidebarOpen,
  updateAppearance, toggleNotif, toggleAiPref,
} = uiSlice.actions;
export default uiSlice.reducer;
