import React, { useMemo, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { store } from './store/store';
import AppRoutes from './routes/AppRoutes';
import { fetchCurrentUser } from './features/authSlice';
import ErrorBoundary from './components/common/ErrorBoundary';
import { ThemeContextProvider } from './context/ThemeContext';

const AppContent = () => {
  const dispatch = useDispatch();
  const { themeMode } = useSelector((state) => state.ui);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token]);

  const theme = useMemo(() => {
    const isDark = themeMode === 'dark';

    // Unique non-black/white palette: Light Orange / Light Green
    const bgDefault      = isDark ? '#1f2937' : '#fafaf9'; // Neutral stone
    const bgPaper        = isDark ? '#374151' : '#ffffff';
    const textPrimary    = isDark ? '#f3f4f6' : '#1c1917';
    const textSecondary  = isDark ? '#9ca3af' : '#57534e';
    const primaryColor   = '#fb923c'; // Light Orange
    const secondaryColor = '#4ade80'; // Light Green

    return createTheme({
      palette: {
        mode: themeMode,
        primary:    { main: primaryColor },
        secondary:  { main: secondaryColor },
        success:    { main: '#4ade80' },
        warning:    { main: '#facc15' },
        error:      { main: '#f87171' },
        info:       { main: '#60a5fa' },
        background: { default: 'transparent', paper: bgPaper },
        text:       { primary: textPrimary, secondary: textSecondary },
        divider:    isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
      },
      typography: {
        fontFamily: '"Outfit", "Inter", sans-serif',
        button: { textTransform: 'none', fontWeight: 600 },
        h1: { fontWeight: 800, letterSpacing: '-0.02em' },
        h2: { fontWeight: 800, letterSpacing: '-0.02em' },
        h3: { fontWeight: 800, letterSpacing: '-0.02em' },
        h4: { fontWeight: 700, letterSpacing: '-0.01em' },
        h5: { fontWeight: 700 },
        h6: { fontWeight: 700 },
      },
      shape: { borderRadius: 12 },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              background: isDark 
                ? 'radial-gradient(circle at 50% 50%, #2f251c 0%, #140d07 100%)' 
                : 'radial-gradient(circle at 50% 50%, #fffbf2 0%, #fef3c7 100%)',
              backgroundAttachment: 'fixed',
              minHeight: '100vh',
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundImage: 'none',
              backgroundColor: isDark ? 'rgba(45, 29, 18, 0.4)' : 'rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow: isDark 
                ? '0 8px 32px 0 rgba(0, 0, 0, 0.4)' 
                : '0 8px 32px 0 rgba(31, 38, 135, 0.05)',
              border: isDark ? '1px solid rgba(251,146,60,0.1)' : '1px solid rgba(255,255,255,0.4)',
            },
            elevation1: {
              boxShadow: isDark 
                ? '0 4px 16px rgba(0,0,0,0.3)' 
                : '0 4px 16px rgba(0,0,0,0.03)',
            },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              backgroundColor: isDark ? 'rgba(26, 24, 53, 0.9)' : 'rgba(252, 250, 245, 0.9)',
              backdropFilter: 'blur(12px)',
              borderBottom: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
              boxShadow: 'none',
            },
          },
        },
        MuiDrawer: {
          styleOverrides: {
            paper: {
              backgroundColor: bgPaper,
              borderRight: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
              boxShadow: 'none',
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 8,
              padding: '8px 20px',
              fontWeight: 600,
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none',
              },
            },
            contained: {
              '&:hover': {
                transform: 'translateY(-1px)',
              },
            },
          },
        },
      },
    });
  }, [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={themeMode} style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <BrowserRouter>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                borderRadius: '8px',
                background: themeMode === 'dark' ? '#26234b' : '#ffffff',
                color: themeMode === 'dark' ? '#e2e8f0' : '#1e293b',
                border: themeMode === 'dark' ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
                fontWeight: 500,
              },
            }}
          />
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <ThemeContextProvider>
          <AppContent />
        </ThemeContextProvider>
      </HelmetProvider>
    </Provider>
  );
}

export default App;
